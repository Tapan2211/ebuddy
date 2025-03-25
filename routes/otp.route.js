const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otp.controller');

router.post('/generete-otp', otpController.sendOTPController);
router.post('/verify-otp', otpController.verifyOTPController);

module.exports = router;