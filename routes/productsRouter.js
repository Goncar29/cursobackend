const express = require('express');
const { faker } = require('@faker-js/faker')
const router = express.Router()

router.get('/', (req, res) => { // ruta dinamica, 2° lugar
	const products = [];
	const { size } = req.query;
	const limit = size || 10;
	for (let i = 0; i < limit; i++) {
		products.push({
			name: faker.commerce.productName(),
			price: parseInt(faker.commerce.price(), 10),
			Image: faker.image.url(),
		})
	}
	res.json(products)
})

router.get('/filter', (req, res) => { // ruta estatica, 1° lugar
	res.send('Yo soy un filter')
})

router.get('/:id', (req, res) => {
	const { id } = req.params;
	res.json({
		id,
		name: 'Product 2',
		price: 2000
	})
})

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: "Created",
    data: body
  })
})

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: "Update",
    data: body,
    id
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: "Update",
    id
  })
})

module.exports = router;
