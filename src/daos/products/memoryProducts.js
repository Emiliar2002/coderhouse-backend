class memoryProducts {
    constructor() {
      this.products = []; // initialize an empty array to store products
    }
  
    // method to list all products in the memory array
    listAll() {
      return this.products;
    }
  
    // method to find a product by id
    findById(id) {
      return this.products.find(product => product.id === id);
    }
  
    // method to add a product to the memory array
    add(product) {
      this.products.push(product);
    }
  
    // method to delete a product by id
    deleteById(id) {
      this.products = this.products.filter(product => product.id !== id);
    }
  
    // method to modify a product by id
    modifyById(id, updates) {
      const product = this.findById(id);
      if (product) {
        Object.assign(product, updates);
      }
    }
  }

module.exports = memoryProducts