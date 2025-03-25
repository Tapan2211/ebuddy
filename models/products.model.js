const db = require('../config/db');

// const createProduct = async (data) => {
//     const {
//         subcategoryId,
//         productName,
//         productBrandName,
//         productImage,
//         productDescription,
//         productColor,
//         productQuantity,
//         productOriginalPrice,
//         productDiscountPercentage,
//         productSize
//     } = data;

//     const query = `
//         INSERT INTO products 
//         (subcategory_id, product_name, product_brand_name, product_image, product_description, product_color, product_quantity, product_original_price, product_discount_percentage, product_size) 
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//     try {
//         const [results] = await db.execute(query, [
//             subcategoryId || null,
//             productName || null,
//             productBrandName || null,
//             productImage || null,
//             productDescription || null,
//             JSON.stringify(productColor || []),  // Convert to JSON (ensure it's always valid)
//             productQuantity || 0,  // Default to 0 if undefined
//             productOriginalPrice || 0.0,  // Default to 0.0 if undefined
//             productDiscountPercentage || 0.0,  // Default to 0.0 if undefined
//             JSON.stringify(productSize || []) // Convert to JSON (ensure it's always valid)
//         ]);

//         return results;
//     } catch (error) {
//         console.error("SQL Error:", error);
//         throw error;
//     }
// };

const createProduct = async (data) => {
    const {
        subcategoryId,
        productName,
        productBrandName,
        productImage,
        productDescription,
        productColor,
        productQuantity,
        productOriginalPrice,
        productDiscountPercentage,
        productSize
    } = data;

    const insertQuery = `
        INSERT INTO products 
        (subcategory_id, product_name, product_brand_name, product_image, product_description, product_color, product_quantity, product_original_price, product_discount_percentage, product_size) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {
        // Insert product (excluding product_final_price)
        const [insertResult] = await db.execute(insertQuery, [
            subcategoryId || null,
            productName || null,
            productBrandName || null,
            productImage || null,
            productDescription || null,
            JSON.stringify(productColor || []),  // Ensure JSON
            productQuantity || 0,
            productOriginalPrice || 0.0,
            productDiscountPercentage || 0.0,
            JSON.stringify(productSize || [])
        ]);

        // Get the inserted product including product_final_price
        const selectQuery = `SELECT * FROM products WHERE product_id = LAST_INSERT_ID()`;
        const [product] = await db.execute(selectQuery);

        if (product.length > 0) {
            const parsedProduct = {
                ...product[0],
                product_color: JSON.parse(product[0].product_color),  // Convert back to array
                product_size: JSON.parse(product[0].product_size)  // Convert back to array
            };
            return parsedProduct;
        }

        return null;
    } catch (error) {
        console.error("SQL Error:", error);
        throw error;
    }
};

const getAllProducts = async () => {
    const query = 'SELECT * FROM products';
    const [results] = await db.execute(query);
    return results.map(product => ({
        ...product,
        product_color: JSON.parse(product.product_color || '[]'),
        product_size: JSON.parse(product.product_size || '[]')
    }));
}

const getProductById = async (id) => {
    console.log("MODLE_ID", id)
    const query = 'SELECT * FROM products WHERE product_id =?';
    const [results] = await db.execute(query, [id]);

    if (results.length === 0) {
        return null;
    }

    const product = results[0];
    return {
        ...product,
        product_color: JSON.parse(product.product_color || '[]'),
        product_size: JSON.parse(product.product_size || '[]')
    };
}

const getProductBySubCategoryId = async (subcategoryId) => {
    const query = 'SELECT * FROM products WHERE subcategory_id =?';
    const [results] = await db.execute(query, [subcategoryId]);
    return results.map(product => ({
        ...product,
        product_color: JSON.parse(product.product_color || '[]'),
        product_size: JSON.parse(product.product_size || '[]')
    }));
}

const updateProductById = async (id, productData) => {
    console.log("Updating product with ID:", id, "Data:", productData);

    if (!id) {
        throw new Error("Product ID is undefined");
    }

    const {
        product_name = null,
        product_image = null,  // ✅ Updated to store correct image URL
        product_brand_name = null,
        product_description = null,
        product_color = [],
        product_quantity = null,
        product_original_price = null,
        product_discount_percentage = 0,
        product_size = [],
        subcategory_id = null
    } = productData;

    // Convert arrays to JSON strings
    const productColorJson = JSON.stringify(product_color);
    const productSizeJson = JSON.stringify(product_size);

    // ✅ Exclude `product_final_price` (auto-calculated by MySQL)
    const query = `
        UPDATE products 
        SET product_name = ?, product_image = ?, product_brand_name = ?, 
            product_description = ?, product_color = ?, product_quantity = ?, 
            product_original_price = ?, product_discount_percentage = ?, 
            product_size = ?, subcategory_id = ? 
        WHERE product_id = ?`;

    const values = [
        product_name,
        product_image,  // ✅ Stores new image URL if updated
        product_brand_name,
        product_description,
        productColorJson,
        product_quantity,
        product_original_price,
        product_discount_percentage,
        productSizeJson,
        subcategory_id,
        id
    ];

    console.log("SQL Query Values:", values); // Debugging log

    const [result] = await db.execute(query, values);

    // ✅ Ensure update was successful
    if (result.affectedRows === 0) {
        return null;
    }

    return getProductById(id);; // Indicate success
};

const deleteProductById = async (id) => {
    const query = 'DELETE FROM products WHERE product_id =?';
    const [results] = await db.execute(query, [id]);
    return results;
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductBySubCategoryId,
    updateProductById,
    deleteProductById,
}