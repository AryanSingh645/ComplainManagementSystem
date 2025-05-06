import nodemailer from "nodemailer";

const sendMail = async (emailId, emailType, messageObj = {}) => {
  if (!emailId || (emailId && emailId.trim().length == 0)) {
    return;
  }
  let emailBody;
  let subject;

  if(emailType == "register"){
    subject = "Complaint Registered Successfully";
      emailBody = `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <title>Complaint Registered</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f7;
            font-size: 18px;
            margin: 0;
            padding: 0;
            }
            .email-container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
            background-color: #005bbb;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 8px 8px 0 0;
            line-height:1.6;
            }
            .content {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
            }
            .footer {
            text-align: center;
            color: #888888;
            font-size: 12px;
            padding: 10px;
            }
            .details {
            background-color: #f1f5f9;
            padding: 10px 15px;
            border-radius: 6px;
            margin-top: 15px;
            }
            .details p {
            margin: 5px 0;
            }
        </style>
        </head>
        <body>
    
        <div class="email-container">
            <div class="header">
            <h2>Complaint Registered Successfully</h2>
            </div>
            <div class="content">
            <p>Dear User,</p>
            <p>Your complaint has been successfully registered. Our team will get in touch with you shortly.</p>
            <div class="details">
                <p><strong>Name:</strong> ${messageObj.name}</p>
                <p><strong>Complain ID:</strong> ${messageObj.id}</p>
                <p><strong>Complain Category:</strong> ${messageObj.complaintCategory}</p>
                <p><strong>Sub Category:</strong> ${messageObj.subCategory}</p>
                <p><strong>Block No.:</strong> ${messageObj.blockNumber}</p>
                <p><strong>Flat No.:</strong> ${messageObj.flatNumber}</p>
                <p><strong>Complaint Description:</strong> ${messageObj.description}</p>
            </div>
            <p>Thank you for reaching out to us.</p>
            <p>Best regards,<br>Your Support Team</p>
            </div>
        </div>
    
        </body>
        </html>
    `;
  }
  else if(emailType == "pingAdmins"){
    subject = "Admin Message";
    emailBody = `
    <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <title>Complaint Registered</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f7;
            margin: 0;
            padding: 0;
            }
            .email-container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
            background-color: #005bbb;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 8px 8px 0 0;
            line-height:1.6;
            }
            .content {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
            }
            .footer {
            text-align: center;
            color: #888888;
            font-size: 12px;
            padding: 10px;
            }
            .details {
            background-color: #f1f5f9;
            padding: 10px 15px;
            border-radius: 6px;
            margin-top: 15px;
            }
            .details p {
            margin: 5px 0;
            }
        </style>
        </head>
        <body>
    
        <div class="email-container">
            <div class="header">
            <h2>Admin Message</h2>
            </div>
            <div class="content">
            <p>Message From ${messageObj.sender},</p>
            <p>${messageObj.message}</p>
            <div class="details">
                <p><strong>Complain Category:</strong> ${messageObj.complaintCategory}</p>
                <p><strong>Sub Category:</strong> ${messageObj.subCategory}</p>
                <p><strong>Complain Description:</strong> ${messageObj.complaintDescription}</p>
                <p><strong>Complained At:</strong> ${messageObj.timestamp}</p>
            </div>
            <p>Best regards,<br>Your Support Team</p>
            </div>
        </div>
    
        </body>
        </html>
      `;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: emailId,
    subject,
    html: emailBody
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error in sendMail:", error);
    throw new Error("Failed to send email");
  }
};

export { sendMail };
