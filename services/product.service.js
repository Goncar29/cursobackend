const { faker } = require('@faker-js/faker')

class ProductService {
    constructor(){
        this.products = [];
        // Vamos a decir que corra una instancia del servicio, va a empezar y generar los productos:
        this.generate();
    }
    // será el metodo para generar con la datafake
    generate() {
      const limit = 100;
      for (let i = 0; i < limit; i++) {
        this.products.push({
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price(), 10),
          Image: faker.image.url(),
        })
      }
    }

    create() {

    }

    find(){
      return this.products;
    }

    findOne(id) {
      return this.products.find(item => item.id === id);
    }

    update() {

    }

    delete() {

    }
}

module.exports = ProductService;
