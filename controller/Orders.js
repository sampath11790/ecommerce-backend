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
  // console.log("postorders");
  const t = await Sequelize.transaction();
  try {
    const cart = await req.user.getCart({ transaction: t });
    const products = await cart.getProducts({ transaction: t });
    // const Totalamount = products.reduce((acc, cur) => {
    //   return acc + cur.price * cur.cartitem.TotalQty;
    // }, 0);
    let totalAmount = 0;
    // console.log("totalamount", Totalamount);
    const order = await req.user.createOrder(
      { Totalamount: totalAmount },
      { transaction: t }
    );

    // await order.addProducts(products, { transaction: t });

    for (const product of products) {
      await order.addProducts(product, {
        through: { TotalQty: product.cartitem.TotalQty },
        transaction: t,
      });
      totalAmount += product.price * product.cartitem.TotalQty;
    }

    order.Totalamount = totalAmount;

    await order.save({ transaction: t });

    await cart.destroy({ transaction: t });

    await t.commit();
    res.json({ message: "Order created successfully" });
  } catch (err) {
    // console.log(err);
    await t.rollback();
    console.log(err);
    res.json({ error: "Failed to create order" });
  }
};
