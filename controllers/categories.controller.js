const categoriesService = require('../services/categories.service');

const createCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const categoryImage = req.file ? req.file.filename : null;

        if (!categoryName || !categoryImage) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const imageUrl = categoryImage ? `${baseUrl}/uploads/${categoryImage}` : null;

        const result = await categoriesService.createCategory({
            categoryName,
            categoryImage,
        });

        res.status(201).json({
            message: 'Category created successfully',
            category: {
                categoryName,
                categoryImage: imageUrl,
            },
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getAllCagories = async (req, res) => {
    try {
        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        const { categories, total } = await categoriesService.getAllCategories(page, limit);
        const totalPages = Math.ceil(total / limit);

        if (categories.length === 0) {
            return res.status(404).json({ message: 'Categories not found' });
        }

        // Debugging: Log what categoriesService returns
        console.log("Raw Categories Data:", categories);

        const categoryWithImageURL = categories.map(cat => {
            console.log(`Processing Category: ${cat.categoryName}, Image: ${cat.categoryImage}`); // Debugging
            return {
                ...cat,
                categoryImage: cat.categoryImage ? `http://localhost:${process.env.PORT}/uploads/${cat.categoryImage}` : null
            };
        });

        res.status(200).json({
            totalCategories: total,
            page,
            limit,
            totalPages,
            categories: categoryWithImageURL
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: error.message });
    }
};



const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("CATEGORY_ID", id)
        const category = await categoriesService.getCategoryById(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.categoryImage = category.categoryImage ? `http://localhost:${process.env.PORT}/uploads/${category.categoryImage}` : null;

        console.log("CATEGORY", category)
        res.status(200).json({ message: 'Category data', category });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const categoryName = req.body.categoryName;
        const categoryImage = req.file ? req.file.filename : null;

        if (!categoryName && !categoryImage) {
            return res.status(400).json({ message: "At least one field is required." });
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const imageUrl = categoryImage ? `${baseUrl}/uploads/${categoryImage}` : null;

        const updatedCategoryData = {};
        if (categoryName) updatedCategoryData.categoryName = categoryName;
        if (categoryImage) updatedCategoryData.categoryImage = categoryImage;

        const result = await categoriesService.updateCategoryById(id, updatedCategoryData);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({
            message: 'Category updated successfully',
            category: {
                id,
                categoryName: updatedCategoryData.categoryName || null,
                categoryImage: imageUrl || null,
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await categoriesService.deleteCategoryById(id);

        if (!result) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createCategory,
    getAllCagories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
}