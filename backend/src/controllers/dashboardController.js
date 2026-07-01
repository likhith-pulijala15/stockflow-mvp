const { Product } = require("../models");

const getDashboard = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        OrganizationId: req.user.organizationId,
      },
    });

    const totalProducts = products.length;

    const totalQuantity = products.reduce(
      (sum, product) => sum + product.quantity,
      0,
    );

    const lowStockItems = products.filter(
      (product) => product.quantity <= product.lowStockThreshold,
    );

    res.json({
      totalProducts,
      totalQuantity,
      lowStockItems,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};
