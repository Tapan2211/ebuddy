const cartModel = require('../models/cart.model');

const addToCart = async (user_id, product_id, quantity) => {
    return await cartModel.addToCart(user_id, product_id, quantity);
}

const getCartItems = async (user_id) => {
    return await cartModel.getCartItems(user_id);
}

const removeFromCart = async (user_id, product_id) => {
    return await cartModel.removeFromCart(user_id, product_id);
}

const updateCartQuantity = async (user_id, product_id, quantity) => {
    return await cartModel.updateCartQuantity(user_id, product_id, quantity);
}

const clearCart = async (user_id) => {
    return await cartModel.clearCart(user_id);
}

module.exports = {
    addToCart,
    getCartItems,
    removeFromCart,
    updateCartQuantity,
    clearCart,
}