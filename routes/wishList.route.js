const express = require('express');
const router = express.Router();

const wishListController = require('../controllers/wishList.controller');

router.post('/wishList/add', wishListController.addWishlistItem);
router.get('/wishList/:user_id', wishListController.getWishlistByUserId);
router.delete('/wishList/remove/:wishlist_id', wishListController.removeFromWishlist);

module.exports = router;