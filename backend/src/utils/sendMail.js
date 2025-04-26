import nodemailer from 'nodemailer';

const sendMail = async (emailId, subject, emailType, name, otp = 0, messageObj = {}) => {
    const regster = ``;
    const message = ``;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    })
    const mailOptions = {
        from: process.env.EMAIL,
        to: emailId,
        subject,
        html: emailType === 'register' ? regster : message,
    }
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error("Error in sendMail:", error);
        throw new Error("Failed to send email");
    }
}

export {sendMail};