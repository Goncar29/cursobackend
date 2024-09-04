const jwt = require('jsonwebtoken');

const secret = 'myCat';
//Con el sub es la forma que se indentificará el usuario
const payload = {
	sub: 1,
	role: 'customer'
}

//Con signToken se genera el token
function signToken(payload, secret) {
	return jwt.sign(payload, secret);
}

//Firma
const token = signToken(payload, secret);
console.log(token);
