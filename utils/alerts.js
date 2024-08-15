const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jayasricharan8122@gmail.com',
        pass: '@Daddy08'
    }
});

function sendAlertEmail(subject, text) {
    const mailOptions = {
        from: 'jayasricharan@gmail.com',
        to: 'charanmoka8122@gmail.com',
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

module.exports = { sendAlertEmail };
