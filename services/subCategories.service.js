const subcategoriesModel = require('../models/subCategories.model');

const createSubCategory = async (data) => {
    return await subcategoriesModel.createSubCategory(data);
}

const getAllSubcategories = async () => {
    return await subcategoriesModel.getAllSubcategories();
}

const getSubcategoriesByCategoryId = async (subcategoryId) => {
    return await subcategoriesModel.getSubcategoriesByCategoryId(subcategoryId);
}

const getSubcategoriesByCategory = async (categoryId) => {
    return await subcategoriesModel.getSubcategoriesByCategory(categoryId);
}

const updateSubcategoryById = async (subcategoryId, updatedData) => {
    return await subcategoriesModel.updateSubcategoryById(subcategoryId, updatedData);
}

const deleteSubcategoryById = async (subcategoryId) => {
    return await subcategoriesModel.deleteSubcategoryById(subcategoryId);
}

module.exports = {
    createSubCategory,
    getAllSubcategories,
    getSubcategoriesByCategoryId,
    getSubcategoriesByCategory,
    updateSubcategoryById,
    deleteSubcategoryById,
}