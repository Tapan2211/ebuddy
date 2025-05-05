const userModel = require('../models/user.model');

const createUser = async (data) => {
    return await userModel.createUser(data);
}

const getUserByMail = async (email) => {
    return await userModel.getUserByMail(email);
}

const getAllUsers = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    return await userModel.getAllUsers(limit, offset);
}

const getUserById = async (id) => {
    return await userModel.getUserById(id);
}

const updateUserById = async (id, data) => {
    return await userModel.updateUserById(id, data);
}

const deleteUserById = async (id) => {
    return await userModel.deleteUserById(id);
}

module.exports = {
    createUser,
    getUserByMail,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
}