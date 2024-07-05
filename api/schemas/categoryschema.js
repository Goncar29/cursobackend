const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();

const createCategoryScheme = Joi.object({
	name: name,required(),
	image: image.required()
});

const updateCategoryScheme = Joi.object({
	name: name,
	image: image
});

const getCategoryScheme = Joi.object({
	id: id.required(),
});

module.exports = { createCategoryScheme, updateCategoryScheme, getCategoryScheme };
