const Producet = require("../Model/Producet");
exports.getCart = async (req, res, next) => {
  const cart = await req.user.getCart();
  const product = await cart.getProducts({
    attributes: { exclude: ["createdAt", "updatedAt", "cartId", "productId"] },
  });
  res.json(product);
};
exports.postCart = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const product = await Producet.findByPk(req.body.id);
    //user cart find
    if (cart) {
      //verify that cart has that product or not
      const cartitem = await cart.getProducts({ where: { id: product.id } });
      if (cartitem.length) {
        // let product = cartitem[0];
        // let qty = product.cartitem.TotalQty + 1;
        // await product.update({ TotalQty: qty });
        const updatedQuantity = cartitem[0].cartitem.TotalQty + 1;
        await cartitem[0].cartitem.update({ TotalQty: updatedQuantity });
        console.log("product", product);

        //increase
      } else {
        //create
        await cart.addProduct(product, { through: { TotalQty: 1 } });
      }
      // console.log("cart", cartitem);
    } else {
      const userCart = await req.user.createCart();
      await userCart.addProduct(product, { through: { TotalQty: 1 } });

      // const newCartItem = await CartItem.create({
      //   cartId: newCart.id,
      //   productId: product.id,
      //   TotalQty: 1,
      // });
    }
    res.json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.json({ error: "failed" });
  }

  // console.log("postcart");
};

exports.deleteCart = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const product = await Producet.findByPk(req.body.id);
    if (cart && product) {
      await cart.removeProduct(product);
      res.json({ message: "Product removed from the cart" });
    } else {
      res.json({ error: "Cart or product not found" });
    }
  } catch (err) {
    // console.log(err);
    res.json({ error: "Failed to remove product from the cart" });
  }
};
