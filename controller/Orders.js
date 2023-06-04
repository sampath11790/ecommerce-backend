const Sequelize = require("../Utli/database");
const Product = require("../Model/Producet");

exports.getOrder = async (req, res, next) => {
  try {
    const orders = await req.user.getOrders({
      include: {
        model: Product,
        attributes: { exclude: ["imageUrl"] },
      },
    });

    // const products = await orders.getProducts();
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
exports.postOrder = async (req, res, next) => {
  //creating trnsaction
  const t = await Sequelize.transaction();
  try {
    //fetching user caty and product
    const cart = await req.user.getCart({ transaction: t });
    const products = await cart.getProducts({ transaction: t });

    //creating oder id with zeno amount
    let totalAmount = 0;

    const order = await req.user.createOrder(
      { Totalamount: totalAmount },
      { transaction: t }
    );

    // await order.addProducts(products, { transaction: t });

    //creating each product with its qty and sum total amount
    for (const product of products) {
      await order.addProducts(product, {
        through: { TotalQty: product.cartitem.TotalQty },
        transaction: t,
      });
      totalAmount += product.price * product.cartitem.TotalQty;
    }

    //adding amount in to orderid
    order.Totalamount = totalAmount;
    //save changes
    await order.save({ transaction: t });

    //now cart is no more needed  so delete
    await cart.destroy({ transaction: t });
    //once all completed save
    await t.commit();
    res.json({ message: "Order created successfully" });
  } catch (err) {
    //else rollback previous state
    await t.rollback();
    console.log(err);
    res.json({ error: "Failed to create order" });
  }
};
