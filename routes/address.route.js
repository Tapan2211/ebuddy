const express = require('express');
const router = express.Router();

const addressController = require('../controllers/address.controller');

router.post('/address/add', addressController.addAddress);
router.get('/address/:user_id', addressController.getAllAddresses);
router.get('/address/id/:address_id', addressController.getAddressById);
router.put('/address/update/:address_id', addressController.updateAddress);
router.delete('/address/delete/:address_id', addressController.deleteAddress);

module.exports = router;