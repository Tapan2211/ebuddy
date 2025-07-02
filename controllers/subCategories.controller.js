const subCategoriesService = require('../services/subCategories.service');

const createSubCategory = async (req, res) => {
    try {

        const { categoryId, subCategoryName } = req.body;
        const subcategoryImage = req.file?.filename || null;

        if (!categoryId || !subCategoryName || !subcategoryImage) {
            return res.status(400).json({
                message: "All fields are required",
                received: { categoryId, subCategoryName, subcategoryImage }
            });
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const imageUrl = `${baseUrl}/uploads/${subcategoryImage}`;

        const subcategoryData = { categoryId, subCategoryName, subcategoryImage: imageUrl };
        const result = await subCategoriesService.createSubCategory(subcategoryData);

        res.status(201).json({
            message: 'Subcategory created successfully',
            Subcategory: subcategoryData,
            id: result.insertId
        });
    } catch (error) {
        console.error("Error creating subcategory:", error);
        res.status(500).json({ message: error.message });
    }
};


const getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await subCategoriesService.getAllSubcategories();

        if (subcategories.length === 0) {
            return res.status(404).json({ message: 'Subcategories not found' });
        }

        res.json({ message: 'Subcategories data', subcategories });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSubcategoriesByCategoryId = async (req, res) => {
    try {
        const { subcategoryId } = req.params;
        const subcategories = await subCategoriesService.getSubcategoriesByCategoryId(subcategoryId);
        if (subcategories.length === 0) {
            return res.status(404).json({ message: 'Subcategories not found for the given category' });
        }
        res.json({ message: 'Subcategories data', subcategories });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSubCategoriesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const subcategories = await subCategoriesService.getSubcategoriesByCategory(categoryId);
        if (subcategories.length === 0) {
            return res.status(404).json({ message: 'Subcategories not found for the given category' });
        }
        res.json({ message: 'Subcategories data', subcategories });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateSubcategoryById = async (req, res) => {
    try {
        const { subcategoryId } = req.params;
        const { subCategoryName } = req.body; // Ensure correct field name
        const subCategoryImage = req.file ? req.file.filename : null;

        if (!subCategoryName && !subCategoryImage) {
            return res.status(400).json({ message: "No valid data to update." });
        }

        const updatedData = {};
        if (subCategoryName) updatedData.subCategoryName = subCategoryName;
        if (subCategoryImage) updatedData.subCategoryImage = subCategoryImage;

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const imageUrl = `${baseUrl}/uploads/${subCategoryImage}`;

        const updatedSubcategoryData = { subcategoryId, subCategoryName, subCategoryImage: imageUrl };
        const result = await subCategoriesService.updateSubcategoryById(subcategoryId, updatedSubcategoryData);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Subcategory not found." });
        }

        res.status(200).json({ message: "Subcategory updated successfully", updatedSubcategoryData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteSubcategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await subCategoriesService.deleteSubcategoryById(id);

        if (!result) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        res.status(200).json({ message: 'Subcategory deleted successfully', result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createSubCategory,
    getAllSubcategories,
    getSubcategoriesByCategoryId,
    getSubCategoriesByCategory,
    updateSubcategoryById,
    deleteSubcategoryById,
}