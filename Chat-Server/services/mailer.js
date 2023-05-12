const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
dotenv.config({path : "../config.env"})

sgMail.setApiKey(process.env.SG_KEY);

const sendSGMail = async ({
    to,
    sender,
    subject,
    html,
    attachments,
    text,
}) => {
    try {
        const from = sender || "sayandas8466@gmail.com";

        const msg = {
            to: to, // Change to your recipient
            from: from, // Change to your verified sender
            subject: subject,
            html: html,
            text: text,
            attachments,
        };


        return sgMail.send(msg);
    } catch (error) {
        console.log(error);
    }
};
 
exports.sendEmail = async (args) => {
    if (!process.env.NODE_ENV === "development") {
        return Promise.resolve();
    } else {
        return sendSGMail(args);
    }
};