const nodemailer = require('nodemailer');
const { generateOTP } = require('../utill/otpUtil');

let otpStorage = {}; //Temporary storage OTP

const sendOTP = async (email) => {
    if (!email) throw new Error('Email is required');

    const otp = generateOTP();
    // Store OTP for verification
    otpStorage[email] = otp;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP is ${otp}. Please do not share it with anyone.`
    }

    await transporter.sendMail(mailOptions);
    return { message: 'OTP sent successfully', otp };
}

// Verify OTP
const verifyOTP = (email, otp) => {
    if (!otpStorage[email]) throw new Error("No OTP found for this email");
    if (otpStorage[email] != otp) throw new Error("Invalid OTP");

    delete otpStorage[email]; // Remove OTP after verification
    return { message: "OTP verified successfully" };
};

module.exports = {
    sendOTP,
    verifyOTP
}