const Sequelize = require("sequelize");
const sequelize = require("../Utli/database");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  rating: Sequelize.INTEGER,
  price: Sequelize.INTEGER,
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: [],
    get() {
      const value = this.getDataValue("imageUrl");
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue("imageUrl", JSON.stringify(value));
    },
  },
});

module.exports = Product;
