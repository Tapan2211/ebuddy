const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');
const upload = require('../middleware/upload.middleware');

router.post('/product/create', upload.single('product_image'), productController.createProduct);
router.get('/product', productController.getAllProducts);
router.get('/product/:id', productController.getProductById);
router.get('/product/subcategory/:id', productController.getProductBySubCategoryId);
router.put('/product/:id', upload.single('product_image'), productController.updateProductById);
router.delete('/product/:id', productController.deleteProductById);

module.exports = router;