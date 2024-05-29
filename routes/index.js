const productsRouter = require('./productsRouter');
const categoriesRouter = require('./categoriesRouter');
const usersRouter = require('./usersRouter');

function routerApi(app){
    app.use('/products', productsRouter);
    app.use('/categories', categoriesRouter);
    app.use('/users', usersRouter);
}

module.exports = routerApi;
