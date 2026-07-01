const sequelize = require("../config/database");

const Organization = require("./Organization");
const User = require("./User");
const Product = require("./Product");

Organization.hasMany(User);
User.belongsTo(Organization);

Organization.hasMany(Product);
Product.belongsTo(Organization);

module.exports = {
  sequelize,
  Organization,
  User,
  Product,
};
