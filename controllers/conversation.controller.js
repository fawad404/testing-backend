import { sendEmail } from "./emailUtilis.js";

let adminEmail = "abdulqadeerbilalofficial@gmail.com";

export const postConversation = async (req, res, next) => {
  const { name, email, phone, message } = req.body; // Destructure incoming data

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Optionally send an email notification
    const subject = "New Contact Form Submission";
    const emailMessage = `
      <h1>New message from ${name}</h1>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;
    await sendEmail(adminEmail, subject, emailMessage);

    // Simulate saving task (adjust as per actual database logic)
    const savedTask = { name, email, phone, message }; // Replace with DB save logic
    res.status(201).json(savedTask);
  } catch (err) {
    next(err); // Pass errors to the error handler
  }
};
