const nodemailer = require("nodemailer");
const { config } = require("./api/config/config")

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true, // Use `true` for port 465, `false` for all other ports
	auth: {
        user: config.mailUser,
        pass: config.mailPassword
    }
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // send mail with defined transport object
	const info = await transporter.sendMail({
		from: 'carlosngonzalez0@gmail.com', // sender address
		to: "carlosngonzalez0@gmail.com", // list of receivers
		subject: "Hello ✔. Este es un nuevo correo", // Subject line
		text: "Hello world?", // plain text body
		html: "<b>Hello world?</b>", // html body
	});

	console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	 // Preview URL: https://ethereal.email/message/ZtIdKj1bwfvkRujRZtIeVTT0NNnZU35ZAAAAA1-N.tzQHHaMYIjyhe1VG9I
}

sendMail().catch(console.error);
