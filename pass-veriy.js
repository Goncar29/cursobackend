const bcrypt = require('bcryptjs');

async function verifyPassword() {
	const myPassword = 'admin 123 .202';
	const hash = '$2b$10$EBrN9Y4.maMP3uAT4/V1POId2SayWT5MoQzqc6u.WDNhJc58KzXIK'
	const isMatch = await bcrypt.compare(myPassword, hash);
	console.log(isMatch);
}

verifyPassword();
