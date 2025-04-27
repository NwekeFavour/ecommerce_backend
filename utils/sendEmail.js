const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create a transporter (basically your email service)
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // e.g., 'Gmail'
    auth: {
      user: process.env.EMAIL_USER,     // your email address
      pass: process.env.EMAIL_PASS      // your email password or app password
    }
  });

  // Define the email options
  const mailOptions = {
    from: `YourApp Support <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  // Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
