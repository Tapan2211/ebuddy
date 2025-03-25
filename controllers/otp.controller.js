const otpService = require('../services/otp.service');

const sendOTPController = async (req, res) => {
    try {
        const { email } = req.body;
        const response = await otpService.sendOTP(email);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const verifyOTPController = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const response = otpService.verifyOTP(email, otp);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

module.exports = {
    sendOTPController,
    verifyOTPController
};
