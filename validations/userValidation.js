const { body } = require('express-validator');

const validateUser = [
    body('name').notEmpty().withMessage("Name is required"),
    body('email').notEmpty().withMessage("Please provide a valid email"),
    body('password').isLength({ min: 3 }).withMessage("Password must be at least 3 characters long")
];

module.exports = validateUser;