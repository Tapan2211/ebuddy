const db = require('../config/db');

const addAddress = async (address) => {
    console.log("Model", address)
    const query = `INSERT INTO address (user_id, name, number, email, pincode, address, locality, district, state, address_type)
    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await db.execute(query, [address.user_id, address.name, address.number, address.email, address.pincode, address.address, address.locality, address.district, address.state, address.address_type]);
    return result;
}

const getAllAddresses = async (user_id) => {
    const query = `SELECT * FROM address WHERE user_id =?`;
    const [results] = await db.execute(query, [user_id]);
    return results;
}

const getAddressById = async (address_id) => {
    console.log("Model Addres_id", address_id)
    const query = `SELECT * FROM address WHERE address_id =?`;
    const [results] = await db.execute(query, [address_id]);
    return results[0];
}

const updateAddress = async (address_id, updatedAddress) => {
    console.log("model address_id", address_id);
    console.log("model updatedAddress", updatedAddress);
    const query = `UPDATE address SET name =?, number =?, email =?, pincode =?, address =?, locality =?, district =?, state =?, address_type =?
    WHERE address_id =?`;
    const [result] = await db.execute(query, [updatedAddress.name, updatedAddress.number, updatedAddress.email, updatedAddress.pincode, updatedAddress.address, updatedAddress.locality, updatedAddress.district, updatedAddress.state, updatedAddress.address_type, address_id]);
    return result;
}

const deleteAddress = async (address_id) => {
    const query = `DELETE FROM address WHERE address_id =?`;
    const [result] = await db.execute(query, [address_id]);
    return result;
}

module.exports = {
    addAddress,
    getAllAddresses,
    getAddressById,
    updateAddress,
    deleteAddress,
}