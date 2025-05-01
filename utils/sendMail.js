require('dotenv').config();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const process = require('process');
require('dotenv').config();
console.log('SMTP_USER =', process.env.SMTP_USER);
console.log('SMTP_PASS =', process.env.SMTP_PASS);


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});


async function sendMail(to, subject, text) {
    const info = await transporter.sendMail({
        from: `"Soporte TutoFlex" <${process.env.SMTP_USER}>`,
        to,
        subject,
        text
    });
    console.log('Email enviado:', info.messageId);
    return info;
}

module.exports = sendMail;
