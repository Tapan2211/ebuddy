const express = require('express');
const router = express.Router();
const subCategoriesController = require('../controllers/subCategories.controller');
const upload = require('../middleware/upload.middleware');

router.post('/subCategories/create', upload.single('subcategoryImage'), subCategoriesController.createSubCategory);
router.get('/subCategories/', subCategoriesController.getAllSubcategories);
router.get("/subCategories/category/:categoryId", subCategoriesController.getSubCategoriesByCategory);
router.get('/subCategories/subcategory/:subcategoryId', subCategoriesController.getSubcategoriesByCategoryId);
router.put('/subCategories/subcategory/:subcategoryId', upload.single('subcategoryImage'), subCategoriesController.updateSubcategoryById);

router.delete('/subcategories/subcategory/:id', subCategoriesController.deleteSubcategoryById);

module.exports = router;