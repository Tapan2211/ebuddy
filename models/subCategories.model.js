const db = require('../config/db');

const createSubCategory = async (data) => {
    const { categoryId, subCategoryName, subcategoryImage } = data; // Use correct names

    if (!categoryId || !subCategoryName || !subcategoryImage) {
        throw new Error('All fields are required');
    }

    const query = "INSERT INTO subcategories (subCategoryName, subCategoryImage, createdAt, updatedAt, categoryId) VALUES (?, ?, NOW(), NOW(), ?)";
    const [results] = await db.execute(query, [subCategoryName, subcategoryImage, categoryId]);
    return results;
};

const getAllSubcategories = async () => {
    const query = "SELECT * FROM subcategories";
    const [rows] = await db.execute(query); // Extract only the result set
    return rows;
}

const getSubcategoriesByCategoryId = async (subcategoryId) => {
    const query = "SELECT * FROM subcategories WHERE subcategoryId = ?";
    const [rows] = await db.execute(query, [subcategoryId]); // ✅ Extract the first element
    return rows.length > 0 ? rows[0] : null;
}

const getSubcategoriesByCategory = async (categoryId) => {
    const query = "SELECT * FROM subcategories WHERE categoryId =?";
    const [rows] = await db.execute(query, [categoryId]);
    return rows;
}

const updateSubcategoryById = async (subcategoryId, updatedData) => {
    const { subCategoryName, subCategoryImage } = updatedData;
    const query = "UPDATE subcategories SET subCategoryName = ?, subCategoryImage = ? WHERE subcategoryId = ?";

    const [results] = await db.execute(query, [subCategoryName, subCategoryImage, subcategoryId]);
    return results;
};


const deleteSubcategoryById = async (subcategoryId) => {
    if (!subcategoryId) {
        throw new Error("subcategoryId is required");
    }

    const query = "DELETE FROM subcategories WHERE subcategoryId = ?";
    const [result] = await db.execute(query, [subcategoryId]);

    if (result.affectedRows === 0) {
        throw new Error("No subcategory found with the given ID");
    }

    return { message: "Subcategory deleted successfully" };
};

module.exports = {
    createSubCategory,
    getAllSubcategories,
    getSubcategoriesByCategoryId,
    getSubcategoriesByCategory,
    updateSubcategoryById,
    deleteSubcategoryById,
}
