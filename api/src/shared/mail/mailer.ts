const nodemailer = require('nodemailer');

export const SMTP_USERNAME = process.env.SMTP_USERNAME || '';
export const SMTP_SECRET = process.env.SMTP_SECRET || '';

export const ACTIVATION_EMAIL = "ACTIVATION_EMAIL";
export const CHANGE_PASSWORD_EMAIL = "CHANGE_PASSWORD_EMAIL";

const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = process.env.SMTP_PORT || '';

export const sendMail = (dest: string, link: string, username: string, type: string) => {
  let mailOptions;
  const destination = 'edouard.jubert@gmail.com'
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_SECRET
    },
      tls:{
        ciphers:'SSLv3'
    }
  });

  switch (type) {
    case ACTIVATION_EMAIL: {
      mailOptions = {
        from: SMTP_USERNAME,
        to: destination,
        subject: 'Activate your account',
        text: 'Welcome to MATCHA ' + username + '! To activate your account, click on this link : http://localhost:8080/auth/activate/' + link
      };
      break;
    }
    case CHANGE_PASSWORD_EMAIL: {
      mailOptions = {
        from: 'no-reply@koodibril.com',
        to: 'florian.marie.doucet@gmail.com',
        subject: 'Change your password',
        text: 'Hello ' + username + '! To change your password, click on this link : http://localhost:8080/auth/password/' + link
      };
      break;
    }
    default: {
      return;
    }
  }
  
  transporter.sendMail(mailOptions, function(error: any, info: any){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}

