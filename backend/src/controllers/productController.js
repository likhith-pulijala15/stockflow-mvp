const { Product } = require("../models");

const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      OrganizationId: req.user.organizationId,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        OrganizationId: req.user.organizationId,
      },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
};
