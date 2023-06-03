const Sequelize = require("sequelize");
const sequelize = require("../Utli/database");

const Cartitem = sequelize.define("cartitem", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  TotalQty: Sequelize.INTEGER,
});

module.exports = Cartitem;
