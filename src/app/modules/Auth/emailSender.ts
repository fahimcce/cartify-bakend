import nodemailer from "nodemailer";
import config from "../../config";

const emailSender = async (email: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: config.sender_mail,
      pass: config.sender_password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: '"PH Health Care👻" <fahimcce@gmail.com>', // sender address
    to: email,
    subject: "Reset Password Link",
    // text: "Hello world?",
    html,
  });

  console.log("Message sent: %s", info.messageId);
};

export default emailSender;
