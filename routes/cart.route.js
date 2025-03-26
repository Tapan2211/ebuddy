const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart.controller');

router.post('/cart/add', cartController.addToCart);
router.get('/cart/:user_id', cartController.getCartItems);
router.delete('/cart/remove', cartController.removeFromCart);
router.put('/cart/update', cartController.updateCartQuantity);
router.delete('/cart/clear', cartController.clearCart);

module.exports = router;