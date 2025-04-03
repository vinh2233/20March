const express = require('express');
const router = express.Router();
const Product = require('../schemas/product');
const Category = require('../schemas/category');

// Hiển thị tất cả sản phẩm trong một category
router.get('/slug/:category', async (req, res, next) => {
  try {
    const categorySlug = req.params.category;

    // Tìm category theo slug
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      return res.status(404).send({ success: false, message: 'Category not found' });
    }

    // Tìm tất cả sản phẩm thuộc category
    const products = await Product.find({ category: category._id });
    res.status(200).send({ success: true, data: products });
  } catch (error) {
    next(error);
  }
});

// Hiển thị một sản phẩm cụ thể
router.get('/slug/:category/:product', async (req, res, next) => {
  try {
    const categorySlug = req.params.category;
    const productSlug = req.params.product;

    // Tìm category theo slug
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      return res.status(404).send({ success: false, message: 'Category not found' });
    }

    // Tìm sản phẩm theo slug và category
    const product = await Product.findOne({ slug: productSlug, category: category._id });
    if (!product) {
      return res.status(404).send({ success: false, message: 'Product not found' });
    }

    res.status(200).send({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});

module.exports = router;