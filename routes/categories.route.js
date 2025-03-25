const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories.controller');
const upload = require('../middleware/upload.middleware');

router.post('/categories/create', upload.single('categoryImage'), categoriesController.createCategory);
router.get('/categories', categoriesController.getAllCagories);
router.get('/categories/:id', categoriesController.getCategoryById);
router.put('/categories/:id', upload.single('categoryImage'), categoriesController.updateCategoryById);
router.delete('/categories/:id', categoriesController.deleteCategoryById);

module.exports = router