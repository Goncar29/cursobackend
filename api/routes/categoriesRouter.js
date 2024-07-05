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

router.get('/:id', (req, res) => {
	const { categoryId, productId } = req.params;
	res.json({
		categoryId,
		productId,
	});
});

module.exports = router;
