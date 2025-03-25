const categoriesModel = require('../models/categories.model');

const createCategory = async (data) => {
    return await categoriesModel.createCategory(data);
}

const getAllCategories = async () => {
    return await categoriesModel.getAllCategories();
}

const getCategoryById = async (id) => {
    return await categoriesModel.getCategoryById(id);
}

const updateCategoryById = async (id, data) => {
    return await categoriesModel.updateCategoryById(id, data);
}

const deleteCategoryById = async (id) => {
    return await categoriesModel.deleteCategoryById(id);
}

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
}