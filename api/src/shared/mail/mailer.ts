const nodemailer = require('nodemailer');

export const SMTP_USERNAME = process.env.SMTP_USERNAME || '';
export const SMTP_SECRET = process.env.SMTP_SECRET || '';

export const ACTIVATION_EMAIL = "ACTIVATION_EMAIL";
export const CHANGE_PASSWORD_EMAIL = "CHANGE_PASSWORD_EMAIL";

export const sendMail = (dest: string, link: string, username: string, type: string) => {
  let mailOptions;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_SECRET
    }
  });

  switch (type) {
    case ACTIVATION_EMAIL: {
      mailOptions = {
        from: 'Matcha Master',
        to: 'florian.marie.doucet@gmail.com', //don't forget to change to dest ;)
        subject: 'Activate your account',
        text: 'Welcome to MATCHA ' + username + '! To activate your account, click on this link : http://localhost:8080/auth/activate/' + link
      };
      break;
    }
    case CHANGE_PASSWORD_EMAIL: {
      mailOptions = {
        from: 'Matcha Master',
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

