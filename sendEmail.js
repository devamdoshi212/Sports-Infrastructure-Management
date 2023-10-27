const nodemailer = require("nodemailer");
const crypto = require("crypto");

 module.exports.passwordGenerate = function(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, charset.length);
    password += charset.charAt(randomIndex);
  }

  return password;
}

// const password = generateRandomPassword(8);

// Create a transporter object using the default SMTP transport

module.exports.sendEmail = function(email,password)
{

  const transporter = nodemailer.createTransport({
    service: "Gmail", // Use your email service provider here
    auth: {
      user: "goheluday6445@gmail.com", // Your email address
      pass: "bypqzlyujtzqvcxx", // Your email password or application-specific password
    },
  });
  
  const emailContent = `
    <html>
      <body>
        <p><strong>Dear Authority,</strong></p>
        <p>This is an email from the admin. Your new password is:</p>
        <p style="font-size: 24px; color: #0077FF;">${password}</p>
        <p>Please change your password after logging in.</p>
      </body>
    </html>
  `;

  console.log("Email  in mailoption" + email);
  
  // Define email data
  const mailOptions = {
   
    from: "udaygohel6445@gmail.com",
    to: email, // Recipient's email address
    subject: "Hello from Node.js",
    html: emailContent,
  };
  
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
  
}
 
