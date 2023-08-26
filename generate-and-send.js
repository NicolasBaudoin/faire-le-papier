require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const { type } = require('os');

// Create a transporter using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, // Example port for SMTP
  secure: false, // false for TLS; true for SSL
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS // Your email password or app-specific password
  }
});

// Read the contents of HTML, CSS, and JavaScript files
const htmlPath = 'index.html'; // Path relative to the repository root
const cssPath = 'styles.css';   // Path relative to the repository root
const jsPath = 'script.js';    // Path relative to the repository root

const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const cssContent = fs.readFileSync(cssPath, 'utf-8');
const jsContent = fs.readFileSync(jsPath, 'utf-8');

// Combine HTML, CSS, and JavaScript into a single HTML string

const combinedHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    ${cssContent}
  </style>
</head>
<body>
  ${htmlContent}
  <script>
    ${jsContent}
  </script>
</body>
</html>
`;

// Define Today date for the email
let dateObj = new Date();
let month = String(dateObj.getMonth() + 1).padStart(2, '0');
let year = dateObj.getFullYear();
let day = String(dateObj.getDate()).padStart(2, '0');
let todayDate = day + '/' + month + '/' + year;

// Define the email options
const mailOptions = {
  from: 'baudoin.nicolasg@ggmail.com', // Sender's email
  to: process.env.EMAIL_USER, // Recipient's email
  subject: `Mise à jour du programme Faire-Le-Papier du ${todayDate}`,
  text: `Salut, j'ai fais une mise à jour du visuel du programme, hésite pas à me donner un retour !`,
//   html: combinedHtml, // Use the combined HTML content here
  attachments: [
    {
      filename: 'faire-le-papier.html',
      content: combinedHtml
    }
  ]
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});