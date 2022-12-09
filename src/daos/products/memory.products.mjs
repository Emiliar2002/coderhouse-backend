class memoryProducts {
    constructor() {
      this.products = []; // initialize an empty array to store products
    }
  
    // method to list all products in the memory array
    getProducts() {
      return this.products;
    }
  
    // method to find a product by id
    getProduct(id) {
      return this.products.find(product => product.id === id);
    }
  
    // method to add a product to the memory array
    createProduct(product) {
      this.products.push(product);
    }
  
    // method to delete a product by id
    deleteProduct(id) {
      this.products = this.products.filter(product => product.id !== id);
    }
  
    // method to modify a product by id
    editProduct(id, updates) {
      const product = this.findById(id);
      if (product) {
        Object.assign(product, updates);
      }
    }
  }

export default memoryProducts;