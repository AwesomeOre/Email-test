const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// POST endpoint to handle email submission
app.post('/send-email', (req, res) => {
  const { email, message } = req.body;

  // Set up nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  // Email options
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'your-email@gmail.com',
    subject: 'New Email Submission',
    text: `Email: ${email}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
      res.status(500).send('Failed to send email');
    } else {
      console.log('Email sent:', info);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
