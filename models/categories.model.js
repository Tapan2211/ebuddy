const db = require('../config/db');

const createCategory = async (data) => {
    const { categoryName, categoryImage } = data;
    if (!categoryName || !categoryImage) {
        throw new Error('All fields are required');
    }

    const sql = 'INSERT INTO categories (categoryName, categoryImage,createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())';
    const [results] = await db.execute(sql, [categoryName, categoryImage]);
    return results;
}

const getAllCategories = async () => {
    const sql = 'SELECT * FROM categories';
    const [results] = await db.execute(sql);
    return results;
}

const getCategoryById = async (id) => {
    const sql = 'SELECT * FROM categories WHERE id = ?';
    const [results] = await db.execute(sql, [id]);
    return results[0];
}

const updateCategoryById = async (id, data) => {
    const { categoryImage, categoryName } = data;
    const sql = 'UPDATE categories SET categoryImage =?, categoryName =? WHERE id =?';
    const [results] = await db.execute(sql, [categoryImage, categoryName, id]);
    return results;
}

const deleteCategoryById = async (id) => {
    const sql = 'DELETE FROM categories WHERE id =?';
    const [results] = await db.execute(sql, [id]);
    return results;
}

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
}