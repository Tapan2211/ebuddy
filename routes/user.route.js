const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const validateUser = require('../validations/userValidation');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/users', validateUser, userController.createUser);


router.post('/login', userController.loginUser);
router.get('/users/:id', authenticateToken, userController.getUser);
router.get('/users', authenticateToken, userController.getAllUsers);
router.put('/users/:id', authenticateToken, userController.updateUser);
router.delete('/users/:id', authenticateToken, userController.deleteUser);

module.exports = router;