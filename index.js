const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
	  res.send(`Hola mi server en express!!!`)
})

app.get('/nueva-ruta', (req, res) => {
	  res.send(`Hola soy una nueva ruta!!!`)
})

app.get('/products', (req, res) => {
	  res.json({
        name: 'Product 1',
        price: 1000
      })
})

app.listen(port, () => {
    console.log(`Mi puerto es: ${port}`);
})
