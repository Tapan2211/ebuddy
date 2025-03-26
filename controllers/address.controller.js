const addressService = require('../services/address.service');

const addAddress = async (req, res) => {
    try {
        const { user_id, name, number, email, pincode, address, locality, district, state, address_type } = req.body;
        if (!user_id || !name || !number || !email || !pincode || !address || !locality || !district || !state || !address_type) {
            return res.status(400).json({ message: "All fields are required" });
        }
        console.log("BODY", req.body);
        console.log("user_id", user_id);
        const result = await addressService.addAddress({ user_id, name, number, email, pincode, address, locality, district, state, address_type });
        const insertedId = result.insertId;
        const insertedAddress = await addressService.getAddressById(insertedId);


        res.status(201).json({ message: "Address added successfully", data: insertedAddress });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllAddresses = async (req, res) => {
    try {
        const { user_id } = req.params;
        if (!user_id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const addresses = await addressService.getAllAddresses(user_id);
        if (!addresses) {
            return res.status(404).json({ message: "No addresses found for this user" });
        }
        res.status(200).json({ message: "Addresses retrieved successfully", addresses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAddressById = async (req, res) => {
    try {
        const { address_id } = req.params;
        if (!address_id) {
            return res.status(400).json({ message: "Address ID is required" });
        }
        console.log("Controller Addres_id", address_id)
        const address = await addressService.getAddressById(address_id);
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        res.status(200).json({ message: "Address retrieved successfully", address });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// const updateAddress = async (req, res) => {
//     try {
//         const { address_id } = req.params;
//         const { name, number, email, pincode, address, locality, district, state, address_type } = req.body;
//         console.log("address_id", address_id);
//         console.log("Controller update data : ", req.body);

//         const result = await addressService.updateAddress(address_id, name, number, email, pincode, address, locality, district, state, address_type);
//         res.status(200).json({ message: "Address updated successfully", result });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

const updateAddress = async (req, res) => {
    try {
        const { address_id } = req.params;
        const updatedAddress = req.body; // Store the full object

        console.log("address_id", address_id);
        console.log("Controller update data: ", updatedAddress);

        const result = await addressService.updateAddress(address_id, updatedAddress);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Address not found or no changes made" });
        }
        res.status(200).json({ message: "Address updated successfully", updatedAddress });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteAddress = async (req, res) => {
    try {
        const { address_id } = req.params;
        if (!address_id) {
            return res.status(400).json({ message: "Address ID is required" });
        }

        const result = await addressService.deleteAddress(address_id);
        res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addAddress,
    getAllAddresses,
    getAddressById,
    updateAddress,
    deleteAddress,
}