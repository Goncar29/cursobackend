const express = require('express');
const ProductService = require('./../services/product.service')
const router = express.Router()
const service = new ProductService();

router.get('/', (req, res) => { // ruta dinamica, 2° lugar
  const products = service.find();
	res.json(products)
})

router.get('/filter', (req, res) => { // ruta estatica, 1° lugar
	res.send('Yo soy un filter')
})

router.get('/:id', (req, res) => {
	const { id } = req.params;
  const product = service.findOne(id);
  res.json(product)
})

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
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
    message: "Deleted",
    id
  })
})

module.exports = router;
