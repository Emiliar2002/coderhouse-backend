const faker = require('@faker-js/faker').faker

class MockProductService {
    getFakeProducts() {
        try{
      const products = [];
      for (let i = 0; i < 5; i++) {
        products.push({
          name: faker.commerce.product(),
          price: parseInt(faker.commerce.price()),
          picture: faker.image.abstract(250, 250, true),
        });
      }
      return {
        success: true,
        data: products,
      };
    }catch(e){
        console.error(e)
        return {
            success: false,
            data: e.message
        }
    }
    }
  }
  
  module.exports = MockProductService;