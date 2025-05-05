const productsService = require('../services/products.service');

const createProduct = async (req, res) => {
    try {
        console.log("Received Data:", req.body);  // Debugging log

        const {
            subcategory_id,
            product_name,
            product_brand_name,
            product_description,
            product_color,
            product_quantity,
            product_original_price,
            product_discount_percentage,
            product_size
        } = req.body;

        const product_image = req.file?.filename || null;

        // Check for missing fields
        if (!subcategory_id || !product_name || !product_brand_name || !product_description || !product_color ||
            !product_quantity || !product_original_price || !product_discount_percentage || !product_size) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Construct image URL
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const imageUrl = product_image ? `${baseUrl}/uploads/${product_image}` : null;

        // Ensure all values are valid
        const product = {
            subcategoryId: subcategory_id || null,
            productName: product_name || null,
            productBrandName: product_brand_name || null,
            productImage: imageUrl || null,
            productDescription: product_description || null,
            productColor: product_color || [],
            productQuantity: product_quantity || 0,
            productOriginalPrice: product_original_price || 0.0,
            productDiscountPercentage: product_discount_percentage || 0.0,
            productSize: product_size || []
        };

        console.log("Product Data to Save:", product); // Debugging log

        // Call service function to save product and fetch the full record
        const savedProduct = await productsService.createProduct(product);

        res.status(201).json({
            message: "Product created successfully",
            product: savedProduct
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;

        page = parseInt(page, 10);
        limit = parseInt(limit, 10);
        if (isNaN(limit) || isNaN(page)) {
            return res.status(400).json({ message: "Invalid page or limit value" });
        }
        const offset = (page - 1) * limit;
        console.log("Controller - Page:", page, "Limit:", limit, "Offset:", offset); // Debug log

        const { products, totalCount } = await productsService.getAllProducts(limit, offset);
        if (products.length === 0) {
            return res.status(404).json({ message: 'Products not found' });
        }

        res.json({
            message: 'Products data',
            products,
            pagination: {
                totalProducts: totalCount,  // Fix: `total` should be `totalCount`
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                limit,
            },

        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("product_id", id)
        const product = await productsService.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product data', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProductBySubCategoryId = async (req, res) => {
    try {
        const { id } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { products, totalCount } = await productsService.getProductBySubCategoryId(id, limit, offset);

        if (products.length === 0) {
            return res.status(404).json({ message: 'Subcategory by id products not found' });
        }
        res.json({
            message: 'Products data',
            products,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalItems: totalCount,
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateProductById = async (req, res) => {
    try {
        const { id } = req.params; // Get product_id from request parameters
        let productData = req.body; // Get update data from request body

        console.log("Updating Product ID:", id, "Received Data:", productData);

        if (!id) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        // Check if product exists
        const existingProduct = await productsService.getProductById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // If a new image is uploaded, update the product image URL
        if (req.file) {
            const imageUrl = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`;
            productData.product_image = imageUrl;
        } else {
            productData.product_image = existingProduct.product_image; // Keep the old image if no new one is uploaded
        }

        // Update the product
        const updateResult = await productsService.updateProductById(id, productData);

        if (!updateResult) {
            return res.status(500).json({ message: "Failed to update product" });
        }

        // Fetch updated product
        const updatedProduct = await productsService.getProductById(id);

        if (!updatedProduct) {
            return res.status(500).json({ message: "Product update failed, could not retrieve updated data" });
        }

        res.json({ message: "Product updated successfully", product: updatedProduct });

    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: error.message });
    }
};


const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await productsService.deleteProductById(id);
        if (!products) {
            return res.status(404).json({ message: 'Products not found' });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductBySubCategoryId,
    updateProductById,
    deleteProductById
}