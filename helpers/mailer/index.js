const nodemailer = require("nodemailer");
const sibTransport = require('nodemailer-sendinblue-transport');
const emailTemplate = require('../../helpers/mailer/emails/emailTemplate');
  // create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(sibTransport({
  apiKey: process.env.SENDINBLUE_API_V2,
}));

//It implements the html email template, adding the body inside of it. Very basic, but works
async function sendEmail(to,subject,body){
  await transporter.sendMail({
    from: process.env.DEFAULT_FROM_EMAIL,
    to,
    subject,
    text: body,
    body: emailTemplate(body)
  });
  console.log('email sent');
}

module.exports = {
  sendEmail
}
