// Import the Nodemailer library
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const EMAIL_NODEMAILER = process.env.EMAIL_NODEMAILER || "";
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "";

// Create a transporter object
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use SSL
    auth: {
        user: EMAIL_NODEMAILER,
        pass: EMAIL_PASSWORD,
    }
});

export async function sendEmail(resetCode: string, targetEmail: string): Promise<void> {
    try {
        const options = mailOptions(resetCode, targetEmail);
        await transporter.sendMail(options);
        // console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Export the function
export default sendEmail;

function mailOptions(otp: string, targetEmail: string): nodemailer.SendMailOptions {
    return {
        from: 'phanluonghuy4623@gmail.com',
        to: targetEmail,
        subject: 'OTP Verification',
        text: `Your reset code is: ${otp}`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title></title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      color: #333;
      background-color: #fff;
    }

    .container {
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      padding: 0 0px;
      padding-bottom: 10px;
      border-radius: 5px;
      line-height: 1.8;
    }

    .header {
      border-bottom: 1px solid #eee;
    }

    .header a {
      font-size: 1.4em;
      color: #000;
      text-decoration: none;
      font-weight: 600;
    }

    .content {
      min-width: 700px;
      overflow: auto;
      line-height: 2;
    }

    .otp {
      background: linear-gradient(to right, #00bc69 0, #00bc88 50%, #00bca8 100%);
      margin: 0 auto;
      width: max-content;
      padding: 0 10px;
      color: #fff;
      border-radius: 4px;
    }

    .footer {
      color: #aaa;
      font-size: 0.8em;
      line-height: 1;
      font-weight: 300;
    }

    .email-info {
      color: #666666;
      font-weight: 400;
      font-size: 13px;
      line-height: 18px;
      padding-bottom: 6px;
    }

    .email-info a {
      text-decoration: none;
      color: #00bc69;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <a>GH HealthConnect</a>
    </div>
    <br />
    <strong>Dear ${targetEmail},</strong>
    <p>
      We have received a request for your GH HealthConnect account. For
      security purposes, please verify your identity by providing the
      following One-Time Password (OTP).
      <br />
      <b>Your One-Time Password (OTP) verification code is:</b>
    </p>
    <h2 class="otp">${otp}</h2>
    <p style="font-size: 0.9em">
      <strong>One-Time Password (OTP) is valid for 5 minutes.</strong>
      <br />
      <br />
      If you did not initiate this login request, please disregard this
      message. Please ensure the confidentiality of your OTP and do not share
      it with anyone.<br />
      <strong>Do not forward or give this code to anyone.</strong>
      <br />
      <br />
      <strong>Thank you for using GH HealthConnect.</strong>
      <br />
      <br />
      Best regards,
      <br />
      <strong>GH Company</strong>
    </p>

    <hr style="border: none; border-top: 0.5px solid #131111" />
    <div class="footer">
      <p>This email can't receive replies.</p>
      <p>
        For more information about GH HealthConnect and your account, visit
        <strong>GH HealthConnect</strong>
      </p>
    </div>
  </div>
</body>
</html>`
    };
}