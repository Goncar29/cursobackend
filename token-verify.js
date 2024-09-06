//Librería de JWT
const jwt = require('jsonwebtoken');

//El secret es importante porque con él se encriptará el header y el payload
const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcyNDQ0MTQwMX0.s_ig-AYFpzcLGd-6BkhgWYNunOJ9KN9Z0sRa5CFs0h4';

//Se ejecuta verify para comprobar si la firma es válida
function verifyToken(token, secret) {
	return jwt.verify(token, secret);
}

//El payload es lo que se va a encriptar dntro del token
const payload = verifyToken(token, secret);
console.log(payload);
