const express = require('express');

const CategoryService = require('./../services/category.service');
const validatorHandlers = require('./../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/category.schema')

const router = express.Router();
const service = new CategoryService();

router.get('/', async (req, res, next) => {
	try {
		const category = await service.find();
		res.json(category);
	} catch (error) {
		next(error);
	}
})

router.get('/:id',
	validatorHandlers(getCategorySchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const category = await service.findOne(id);
			res.json(category);
		} catch (error) {
			next(error);
		}
});

router.post('/:id',
	validatorHandlers(createCategorySchema, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newCategory = await service.create(body);
			res.status(201).json(newCategory)
		} catch (error) {
			next(error);
		}
});

router.patch('/:id',
	validatorHandlers(getCategorySchema, 'params'),
	validatorHandlers(updateCategorySchema, 'body'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const category = await service.update(id, body);
			res.json(category)
		} catch (error) {
			next(error);
		}
});

router.delete('/:id',
	validatorHandlers(getCategorySchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			await service.delete(id);
			res.status(201).json({id})
		} catch (error) {
			next(error);
		}
});

module.exports = router;
