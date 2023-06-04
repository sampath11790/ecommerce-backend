const Sequelize = require("sequelize");
const sequelize = require("../Utli/database");

const Orderitem = sequelize.define("orderitem", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  TotalQty: Sequelize.INTEGER,
});

module.exports = Orderitem;
