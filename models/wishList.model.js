const db = require('../config/db');

const addWishlistItem = async (wishlist) => {
    const { user_id, product_id } = wishlist;
    if (!user_id || !product_id) {
        throw new Error('User ID and Product ID are required');
    }

    const query = "INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)";
    const [results] = await db.execute(query, [user_id, product_id]);
    // Fetch the newly added wishlist item
    const fetchQuery = `SELECT * FROM wishlist WHERE wishlist_id = ?`;
    const [rows] = await db.execute(fetchQuery, [results.insertId]);

    return rows.length > 0 ? rows[0] : null;
}

const getWishlistByUserId = async (user_id) => {
    const query = `
        SELECT w.*, 
               p.product_name, 
               p.product_original_price, 
               p.product_image, 
               p.product_discount_percentage,
               subcategories.subcategoryName, 
               categories.categoryName
        FROM wishlist w
        JOIN products p ON w.product_id = p.product_id
        LEFT JOIN subcategories ON p.subcategory_id = subcategories.subcategoryId
        LEFT JOIN categories ON subcategories.categoryId = categories.id
        WHERE w.user_id = ?`;
    const [rows] = await db.execute(query, [user_id]);
    return rows;
}

const removeFromWishlist = async (wishlist_id) => {
    const query = "DELETE FROM wishlist WHERE wishlist_id =?";
    const [results] = await db.execute(query, [wishlist_id]);
    return results.affectedRows > 0;
}

module.exports = {
    addWishlistItem,
    getWishlistByUserId,
    removeFromWishlist,
}