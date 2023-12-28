import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  auth: {
    pass: process.env.MAIL_GUN_PW,
    user: process.env.MAIL_GUN_USER,
  },
  host: "smtp.mailgun.org",
  port: 465,
  secure: true,
  service: "Mailgun",
});
