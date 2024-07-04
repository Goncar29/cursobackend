const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const {
	logErrors,
	errorHandler,
	boomErrorHandler,
} = require('./middlewares/error.handler');

const port = 4000;
const app = express();

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

app.get('/', (req, res) => {
	res.send(`Hola mi server en express!!!`);
});

app.get('/nueva-ruta', (req, res) => {
	res.send(`Hola soy una nueva ruta!!!`);
});

app.listen(port, () => {
	console.log(`Mi puerto es: ${port}`);
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
