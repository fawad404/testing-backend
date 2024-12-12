import nodemailer from 'nodemailer';

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mrrobot34404@gmail.com', // your Gmail address
    pass: 'hcem kjbl oeub czua' // your Gmail app password
}
});

// Function to send email
export async function sendEmail(to, subject, message) {
  const mailOptions = {
    from: '"ExpertSync" <mrrobot34404@gmail.com>',
    to, // Single email recipient
    subject,
    html: message, // HTML message
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to: ${to}, Response: ${info.response}`);
    return info;
  } catch (error) {
    console.error(`Error sending email to ${to}: `, error);
    throw error; // Throw the error so it can be handled in the calling code
  }
}
