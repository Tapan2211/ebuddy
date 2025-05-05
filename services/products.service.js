const productsModel = require('../models/products.model');

const createProduct = async (data) => {
    return await productsModel.createProduct(data);
}

const getAllProducts = async (limit, offset) => {
    console.log("Limit:", limit, "Offset:", offset);
    return await productsModel.getAllProducts(limit, offset);
}

const getProductById = async (id) => {
    return await productsModel.getProductById(id);
}

const getProductBySubCategoryId = async (categoryId, limit, offset) => {
    console.log("Category ID:", categoryId, "Limit:", limit, "Offset:", offset);
    return await productsModel.getProductBySubCategoryId(categoryId, limit, offset);
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