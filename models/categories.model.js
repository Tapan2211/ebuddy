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

const getAllCategories = async (limit, offset) => {
    // const sql = 'SELECT * FROM categories';
    limit = parseInt(limit, 10);
    offset = parseInt(offset, 10);

    // Get total count of users
    const countQuery = 'SELECT COUNT(*) AS total FROM categories';
    const [countResult] = await db.execute(countQuery);
    const total = countResult[0].total;

    // Fetch paginated users
    const query = `SELECT * FROM categories LIMIT ${limit} OFFSET ${offset}`;
    console.log("Executing SQL:", query);

    const [results] = await db.execute(query);

    return { categories: results, total };
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