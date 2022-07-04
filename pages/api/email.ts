const nodemailer = require('nodemailer');
// import dbConnect from '../../utils/dbconnections';

// dbConnect();

export default async (req: any, res: any) => {
  let message = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  };
  async function sendEmail() {
    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.yahoo.com',
      port: 465,
      auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASS,
      },
      secure: true, // true for 465, false for other  || ports
      tls: {
        rejectUnauthorized: false,
      },
    });

    let info = await transporter.sendMail({
      from: process.env.EMAIL_NAME, // sender address
      to: 'zebrauskas.mar@gmail.com', // list of receivers
      subject: 'Smart Book Message Center', // Subject line
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
    sendEmail()
      .then(() => {
        res.status(200).json({ success: true, message: process.env.TEST_INFO });
      })
      .catch((err) => {
        res.status(404).json({ success: false, err: err.message, message: 'Email not been sent' });
      });
  } catch (err: any) {
    res.status(404).json({ success: false, err: err.message, message: 'Email catch error' });
  }
};
