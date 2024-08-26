//Llamar la librería passport-jwt
const { Strategy, ExtractJwt } = require('passport-jwt');
//Necesitamos a config para el secreto
const { config } = require('../../../config/config');

const options = {
	//De dónde va a sacar el token:
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	//Secreto para ver si la firma es válida o no:
	secretOrKey: config.jwtSecret
}

//Estrategia:
const JwtStrategy = new Strategy(options, (payload, done) => {
	//Retorna cuando todo está bien y devuelve el payload que verificó:
	return done(null, payload);
});

module.exports = JwtStrategy;
