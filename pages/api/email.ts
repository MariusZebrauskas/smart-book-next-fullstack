const nodemailer = require('nodemailer');
import dbConnect from '../../utils/dbconnections';

dbConnect();

export default async (req: any, res: any) => {
  let message = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  };
  async function sendEmail() {
    // FIXME:test account + env data
    const testAccount = {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASS,
    };

    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.yahoo.com',
      port: 465,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
      secure: true, // true for 465, false for other ports
      tls: {
        rejectUnauthorized: false,
      },
    });

    let info = await transporter.sendMail({
      from: testAccount.user, // sender address
      to: 'zebrauskas.mar@gmail.com', // list of receivers
      subject: 'Smart Book', // Subject line
      html: `<div>
            <h1>message from smart book ,</h1>
            <h4>name: ${message.name} ,</h4>
            <h4>email: ${message.email} ,</h1>
            <h3>${message.message}</h3>
        </div>`,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
  try {
    sendEmail().catch((err) => {
      res.status(404).json({ success: false, err: err.message, message: 'Email not been sent' });
    });
    res.status(200).json({ success: true, message: 'Email has been send succesfuly' });
  } catch (err: any) {
    res.status(404).json({ success: false, err: err.message, message: 'Email not been sent' });
  }
};
