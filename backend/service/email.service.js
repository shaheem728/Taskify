const nodemailer = require("nodemailer")


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
    }
});

const sendOtpEmail = async (email, otp) => {
    await transporter.sendMail({
        from: "Taskify <${process.env.EMAIL_USER}>",
        to: email,
        subject: "Password Reset OTP",
        html: `
        <h2>Taskify Password Reset</h2>
        <p>Please use the following OTP to reset your password:</p>
        <p><strong>${otp}</strong></p>
        <p>This OTP will expire in 5 minutes.</p>
        <p>If you didn't request this reset, you can safely ignore this email.</p>
        <p>Thank you,<br>Taskify Team</p>
        `
    })
}

module.exports = { sendOtpEmail }