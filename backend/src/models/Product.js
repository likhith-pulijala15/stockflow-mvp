const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  costPrice: {
    type: DataTypes.DECIMAL(10, 2),
  },
  sellingPrice: {
    type: DataTypes.DECIMAL(10, 2),
  },
  lowStockThreshold: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
  },
});

module.exports = Product;
