const wishListService = require('../services/wishList.service');

const addWishlistItem = async (req, res) => {
    try {
        const { user_id, product_id } = req.body;
        if (!user_id || !product_id) {
            return res.status(400).json({ message: 'User ID and product ID are required' });
        }
        const wishlistItem = await wishListService.addWishlistItem({ user_id, product_id });
        res.status(201).json({ message: 'Product added to wishlist successfully', wishlistItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getWishlistByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;
        if (!user_id) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const wishlistItems = await wishListService.getWishlistByUserId(user_id);
        res.json({ message: 'Wishlist fetched successfully', wishlistItems });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const removeFromWishlist = async (req, res) => {
    try {
        const { wishlist_id } = req.params;
        if (!wishlist_id) {
            return res.status(400).json({ message: 'Wishlist ID is required' });
        }
        const result = await wishListService.removeFromWishlist(wishlist_id);
        if (!result) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }
        res.status(200).json({ message: 'Product removed from wishlist successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addWishlistItem,
    getWishlistByUserId,
    removeFromWishlist,
}