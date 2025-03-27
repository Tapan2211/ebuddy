const db = require('../config/db');

const addToCart = async (user_id, product_id, quantity = 1) => {
    if (!user_id || !product_id) {
        throw new Error("User ID and Product ID are required");
    }

    const cartQuantity = Number(quantity) || 1;

    // Insert or update the cart quantity
    const query = `INSERT INTO cart (user_id, product_id, quantity) 
                   VALUES (?, ?, ?) 
                   ON DUPLICATE KEY UPDATE quantity = quantity + ?`;
    const values = [user_id, product_id, cartQuantity, cartQuantity];
    await db.execute(query, values);

    // ✅ Fix: Corrected the column name from "prodcut_image" to "product_image"
    const productQuery = `SELECT product_id, product_name, product_image, product_original_price, 
                                 product_discount_percentage, product_final_price 
                          FROM products WHERE product_id = ?`;
    const [productResults] = await db.execute(productQuery, [product_id]);

    if (productResults.length === 0) {
        throw new Error("Product not found");
    }

    return productResults[0]; // Return product details
};

const getCartItems = async (user_id) => {
    const query = `
        SELECT cart.cart_id, cart.product_id, cart.quantity,
               products.product_name, products.product_image, 
               products.product_original_price, products.product_discount_percentage, 
               products.product_final_price, 
               subcategories.subcategoryName, categories.categoryName
        FROM cart 
        JOIN products ON cart.product_id = products.product_id
        LEFT JOIN subcategories ON products.subcategory_id = subcategories.subcategoryId
        LEFT JOIN categories ON subcategories.categoryId = categories.id
        WHERE cart.user_id = ?`;

    const [results] = await db.execute(query, [user_id]);

    return results.map(product => ({
        ...product,
        product_final_price: parseFloat(product.product_final_price),
        subcategoryName: product.subcategoryName || "N/A",  // ✅ Handle NULL values
        categoryName: product.categoryName || "N/A" // ✅ Handle NULL values
    }));
};

const removeFromCart = async (user_id, product_id) => {
    const query = 'DELETE FROM cart WHERE user_id =? AND product_id =?';
    const [results] = await db.execute(query, [user_id, product_id]);
    return results;
}

const updateCartQuantity = async (user_id, product_id, quantity) => {
    const query = 'UPDATE cart SET quantity =? WHERE user_id =? AND product_id =?';
    const [results] = await db.execute(query, [quantity, user_id, product_id]);
    return results;
}

const clearCart = async (user_id) => {
    const query = 'DELETE FROM cart WHERE user_id =?';
    const [results] = await db.execute(query, [user_id]);
    return results;
}

module.exports = {
    addToCart,
    getCartItems,
    removeFromCart,
    updateCartQuantity,
    clearCart,
}