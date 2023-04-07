const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "willypruebas6@gmail.com",
    pass: "qflwbnthttjzmlva", 
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify().then(() => {
  console.log("Ready for send emails");
});

const emailSender = async (person: any, newPassword: string) => {
  try {
    const EmailSent = await transporter.sendMail({
      from: 'willypruebas6@gmail.com',
      to: 'willyabadquispehuamani@gmail.com',
      subject: 'Hola: ' + person.name + ' ' + person.paternallastname,
      html:
      `<h1>Recovery password</h1></br>
      <h2>Se le asigno una nueva contraseña</h></br>
      <b>New password: ` + newPassword +`</b>`,
    });
    
    return { sucess: true, data: EmailSent, error: false };
  } catch (e) {
    return { sucess: false, data: null, error: (e as Error).message };
  }
};

export { emailSender };
