const cartService = require('../services/cart.service');

const addToCart = async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body;

        console.log('user_id', user_id);
        console.log('product_id', product_id);
        console.log('quantity', quantity);

        // 🚨 Validate Required Fields
        if (!user_id || !product_id) {
            return res.status(400).json({ message: "User ID and Product ID are required" });
        }

        // ✅ Ensure quantity has a valid default value
        const cartQuantity = quantity ? Number(quantity) : 1;

        // 🛒 Call Model Function
        const productData = await cartService.addToCart(user_id, product_id, cartQuantity);

        res.json({ message: "Product added to cart successfully", product: productData, quantity, user_id });

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: error.message });
    }
};


const getCartItems = async (req, res) => {
    try {
        const { user_id } = req.params;
        if (!user_id) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const cartItems = await cartService.getCartItems(user_id);

        let totalAmount = 0;
        let totalItems = 0;

        cartItems.forEach(item => {
            totalAmount += item.product_final_price * item.quantity;
            totalItems += item.quantity;
        });

        res.status(200).json({
            message: 'Cart items',
            cartItems,
            totalAmount: totalAmount.toFixed(2),
            totalItems
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const removeFromCart = async (req, res) => {
    try {
        const { user_id, product_id } = req.body;
        console.log('user_id_remove', user_id);
        console.log('product_id_remove', product_id);
        if (!user_id || !product_id) {
            return res.status(400).json({ message: 'User ID and product ID are required' });
        }
        const result = await cartService.removeFromCart(user_id, product_id);
        res.status(200).json({ message: 'Product removed from cart successfully', result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateCartQuantity = async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body;
        console.log('user_id_update', user_id);
        console.log('product_id_update', product_id);
        console.log('quantity_update', quantity);

        if (!user_id || !product_id || quantity < 1) {
            return res.status(400).json({ message: "Invalid data provided" });
        }

        const result = await cartService.updateCartQuantity(user_id, product_id, quantity);
        res.status(200).json({ message: 'Cart quantity updated successfully', result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const clearCart = async (req, res) => {
    try {
        const { user_id } = req.body;
        console.log('user_id_clear', user_id);
        if (!user_id) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const result = await cartService.clearCart(user_id);
        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addToCart,
    getCartItems,
    removeFromCart,
    updateCartQuantity,
    clearCart,
}