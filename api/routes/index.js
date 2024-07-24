const express = require('express');

const productsRouter = require('./productsRouter');
const categoriesRouter = require('./categoriesRouter');
const usersRouter = require('./usersRouter');
const ordersRouter = require('./ordersRouter');
const customerRouter = require('./customersRouter');

function routerApi(app) {
	const router = express.Router();
	app.use('/api/v1', router);
	router.use('/products', productsRouter);
	router.use('/categories', categoriesRouter);
	router.use('/users', usersRouter);
	router.use('/orders', ordersRouter);
	router.use('/customers', customerRouter);
}

module.exports = routerApi;
