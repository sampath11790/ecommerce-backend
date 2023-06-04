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
    //user cart find
    const cart = await req.user.getCart();
    const product = await Producet.findByPk(req.body.id);

    //if user has cart go inside else create new cart with id
    if (cart) {
      //verify that cart has that product or not

      const cartitem = await cart.getProducts({ where: { id: product.id } });
      if (cartitem.length) {
        //if cart has that product increate qty

        const updatedQuantity = cartitem[0].cartitem.TotalQty + 1;
        await cartitem[0].cartitem.update({ TotalQty: updatedQuantity });
      } else {
        //add product in user cart with qty 1
        await cart.addProduct(product, { through: { TotalQty: 1 } });
      }
      // console.log("cart", cartitem);
    } else {
      //creating cart with single product with  qty one
      const userCart = await req.user.createCart();
      await userCart.addProduct(product, { through: { TotalQty: 1 } });
    }
    res.json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.json({ error: "failed" });
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    //fetching user  cart and product

    const cart = await req.user.getCart();
    const product = await Producet.findByPk(req.body.id);
    if (cart && product) {
      //if cart has thet product delete product from cart

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
