const productsService = require('../services/products.service');

// const createProduct = async (req, res) => {
//     try {
//         console.log("Received Data:", req.body);  // Debugging log

//         const { subcategory_id, product_name, product_brand_name,
//             product_description, product_color, product_quantity, product_original_price,
//             product_discount_percentage, product_size
//         } = req.body;

//         const product_image = req.file?.filename || null;  // Handle image upload

//         // Check if any required field is undefined
//         if (!subcategory_id || !product_name || !product_brand_name || !product_description || !product_color ||
//             !product_quantity || !product_original_price || !product_discount_percentage || !product_size) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // Construct image URL
//         const baseUrl = `${req.protocol}://${req.get('host')}`;
//         const imageUrl = product_image ? `${baseUrl}/uploads/${product_image}` : null;

//         // Ensure all values are valid or NULL
//         const product = {
//             subcategory_id: subcategory_id || null,
//             product_name: product_name || null,
//             product_brand_name: product_brand_name || null,
//             product_image: imageUrl || null,
//             product_description: product_description || null,
//             product_color: product_color || null,
//             product_quantity: product_quantity || null,
//             product_original_price: product_original_price || null,
//             product_discount_percentage: product_discount_percentage || null,
//             product_final_price: product_original_price && product_discount_percentage
//                 ? product_original_price - (product_original_price * product_discount_percentage / 100)
//                 : null,
//             product_size: product_size || null
//         };

//         console.log("Product Data to Save:", product); // Debugging log

//         // Call service function to save product
//         const result = await productsService.createProduct(product);

//         res.status(201).json({
//             message: "Product created successfully",
//             Product: product,
//             id: result.insertId
//         });

//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ message: error.message });
//     }
// };

// const createProduct = async (req, res) => {
//     try {
//         console.log("Received Data:", req.body);  // Debugging log

//         const {
//             subcategory_id,  // Fix: Ensure this matches the model key
//             product_name,
//             product_brand_name,
//             product_description,
//             product_color,
//             product_quantity,
//             product_original_price,
//             product_discount_percentage,
//             product_size
//         } = req.body;

//         const product_image = req.file?.filename || null;  // Handle image upload safely

//         // Check for missing fields
//         if (!subcategory_id || !product_name || !product_brand_name || !product_description || !product_color ||
//             !product_quantity || !product_original_price || !product_discount_percentage || !product_size) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // Construct image URL
//         const baseUrl = `${req.protocol}://${req.get('host')}`;
//         const imageUrl = product_image ? `${baseUrl}/uploads/${product_image}` : null;

//         // Calculate final price
//         const product_final_price = product_original_price - (product_original_price * product_discount_percentage / 100);

//         // Ensure all values are valid (not undefined)
//         const product = {
//             subcategoryId: subcategory_id || null,  // Fix: Convert key to match model
//             productName: product_name || null,
//             productBrandName: product_brand_name || null,
//             productImage: imageUrl || null,
//             productDescription: product_description || null,
//             productColor: product_color || [], // Ensure it's an array
//             productQuantity: product_quantity || 0,
//             productOriginalPrice: product_original_price || 0.0,
//             productDiscountPercentage: product_discount_percentage || 0.0,
//             productSize: product_size || [] // Ensure it's an array
//         };

//         console.log("Product Data to Save:", product); // Debugging log

//         // Call service function to save product
//         const result = await productsService.createProduct(product);

//         res.status(201).json({
//             message: "Product created successfully",
//             Product: product,
//             id: result.insertId
//         });

//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ message: error.message });
//     }
// };


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
        const products = await productsService.getAllProducts();
        if (products.length === 0) {
            return res.status(404).json({ message: 'Products not found' });
        }

        res.json({ message: 'Products data', products });
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
        console.log("subcategory_id", id)
        const products = await productsService.getProductBySubCategoryId(id);

        if (products.length === 0) {
            return res.status(404).json({ message: 'Subcategory by id products not found' });
        }
        res.json({ message: 'Products data', products });

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




// const updateProductById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const productData = req.body;

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

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