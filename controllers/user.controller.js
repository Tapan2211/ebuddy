const { validationResult } = require('express-validator');
const userService = require('../services/user.service');
const bcrypt = require('bcryptjs');
const jwtUtils = require('../utill/jwtUtil');

const createUser = async (req, res) => {
    const errors = validationResult(req); // Use validationResult
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Hash the user's password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;

        const user = await userService.createUser(req.body);

        // Generate JWT token
        const token = jwtUtils.generateToken(user);

        res.status(201).json({
            message: 'Successfully created user', user: {
                id: user.insertId, // Assuming you want to return the inserted ID
                name: req.body.name,
                email: req.body.email
            },
            token
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.getUserByMail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwtUtils.generateToken(user);
        res.json({
            message: 'Login successful',
            user,
            token
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUser();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        await userService.updateUser(req.params.id, req.body);
        const updatedUser = await userService.getUserById(req.params.id);
        res.json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        await userService.deleteUser(req.params.id);
        res.json({ message: 'User deleted successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createUser,
    loginUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
};