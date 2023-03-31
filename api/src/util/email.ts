const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "willypruebas6@gmail.com",
    pass: "spboeojerncfkvoo", 
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify().then(() => {
  console.log("Ready for send emails");
});

const emailSender = async (person: any, newPassword: string) => {
  const EmailSent = await transporter.sendMail({
    from: '"Willy Quispe " <willypruebas6@gmail.com>',
    to: person.email,
    subject: "Hola: " + person.name + " " + person.paternallastname,
    html:
      `<h1>Recovery password</h1></br>
      <h2>Se le asigno una nueva contraseña</h></br>
      <b>New password: ` + newPassword +`</b>`,
  });
  return EmailSent;
};

export { emailSender };
