const productsModel = require('../models/products.model');

const createProduct = async (data) => {
    return await productsModel.createProduct(data);
}

const getAllProducts = async () => {
    return await productsModel.getAllProducts();
}

const getProductById = async (id) => {
    return await productsModel.getProductById(id);
}

const getProductBySubCategoryId = async (categoryId) => {
    return await productsModel.getProductBySubCategoryId(categoryId);
}

const updateProductById = async (id, data) => {
    return await productsModel.updateProductById(id, data);
}

const deleteProductById = async (id) => {
    return await productsModel.deleteProductById(id);
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductBySubCategoryId,
    updateProductById,
    deleteProductById,
}