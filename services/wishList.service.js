const wishListModel = require('../models/wishList.model');

const addWishlistItem = async (data) => {
    return await wishListModel.addWishlistItem(data);
}

const getWishlistByUserId = async (user_id) => {
    return await wishListModel.getWishlistByUserId(user_id);
}

const removeFromWishlist = async (wishlist_id) => {
    return await wishListModel.removeFromWishlist(wishlist_id);
}

module.exports = {
    addWishlistItem,
    getWishlistByUserId,
    removeFromWishlist,
}