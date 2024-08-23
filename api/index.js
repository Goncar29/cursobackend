const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { config } = require('./config/config');
const { checkApiKey } = require('./middlewares/auth.handler');
const passport = require('passport')
const { logErrors,ormErrorHandler,errorHandler,boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = config.port || 4000;

app.use(express.json());

const whitelist = ['http://myapp.co', 'http://127.0.0.1:5500'];
const options = {
	origin: (origin, callback) => {
		if (whitelist.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error('No permitido!'));
		}
	}
}

app.use(cors(options));

require('./utils/auth');

app.get('/api', (req, res) => {
	res.send(`Hola mi server en express!!!`);
});

app.get('/nueva-ruta', checkApiKey, (req, res) => {
	res.send('Hola, soy una nueva ruta');
});

app.listen(port, () => {
	console.log(`Mi puerto es: ${port}`);
});

app.use(passport.initialize());

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;
