const nodemailer = require('nodemailer');

export const SMTP_USERNAME = process.env.SMTP_USERNAME || '';
export const SMTP_SECRET = process.env.SMTP_SECRET || '';

export const sendMail = (dest: string, sub: string, link: string, username: string) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_SECRET
    }
  });
  
  const mailOptions = {
    from: 'Matcha Master',
    to: 'florian.marie.doucet@gmail.com',
    subject: sub,
    text: 'Welcome to MATCHA ' + username + '! To activate your account, click on this link : http://localhost:8080/auth/activate/' + link
  };
  
  transporter.sendMail(mailOptions, function(error: any, info: any){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}

