// const Image = require("../Model/Image");
const Product = require("../Model/Producet");

exports.postProduct = async (req, res, next) => {
  //   console.log("postcart");
  try {
    const { title, rating, price, imageUrl } = req.body;
    const product = await Product.create({
      title,
      rating,
      price,
      imageUrl,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      error: "Failed to create product",
      message: error.message,
    });
  }
};

exports.getProduct = async (req, res, next) => {
  const products = await Product.findAll();
  res.json(products);
};
