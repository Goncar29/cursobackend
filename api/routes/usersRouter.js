const express = require('express');

const UserService = require('./../services/user.service');
const validatorHandlers = require('./../middleware/validator.handlers');
const { createUserSchema, getUserSchema, updateUserSchema } = require('./..schemas/user.schema');

const router = express.Router();
service = new UserService();

router.get('/', async (req, res, next) => {
	try {
		const users = await service.find();
		res.json(users);
	} catch (error) {
		next(error);
	}
})

router.get('/:id',
	validatorHandlers(getUserSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const user = await service.findOne(id);
			res.json(user);
		} catch (error) {
			next(error);
		}
});

router.post('/:id',
	validatorHandlers(createUserSchema, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newUser = await service.create(body);
			res.status(201).json(newUser)
		} catch (error) {
			next(error);
		}
});

router.patch('/:id',
	validatorHandlers(getUserSchema, 'params'),
	validatorHandlers(updateUserSchema, 'body'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const user = await service.update(id, body);
			res.json(user)
		} catch (error) {
			next(error);
		}
});

router.delete('/:id',
	validatorHandlers(getUserSchema, 'params'),
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
