const addressModel = require('../models/address.model');

const addAddress = async (address) => {
    console.log("Service", address)
    return await addressModel.addAddress(address);
}

const getAllAddresses = async (user_id) => {
    return await addressModel.getAllAddresses(user_id);
}

const getAddressById = async (address_id) => {
    console.log("Service Addres_id", address_id)
    return await addressModel.getAddressById(address_id);
}

const updateAddress = async (address_id, updatedAddress) => {
    console.log("service address_id", address_id);
    console.log("service updatedAddress", updatedAddress);
    return await addressModel.updateAddress(address_id, updatedAddress);
}

const deleteAddress = async (address_id) => {
    return await addressModel.deleteAddress(address_id);
}

module.exports = {
    addAddress,
    getAllAddresses,
    getAddressById,
    updateAddress,
    deleteAddress,
}