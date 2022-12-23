class memoryMessages {
    constructor() {
      this.messages = []; // initialize an empty array to store messages
    }
  
    // method to list all messages in the memory array
    getMessages() {
      return this.messages;
    }
  
    // method to find a product by id
    getMessage(id) {
      return this.messages.find(product => product.id === id);
    }
  
    // method to add a product to the memory array
    createMessage(product) {
      this.messages.push(product);
    }
  
    // method to delete a product by id
    deleteMessage(id) {
      this.messages = this.messages.filter(product => product.id !== id);
    }
  
    // method to modify a product by id
    editMessage(id, updates) {
      const product = this.findById(id);
      if (product) {
        Object.assign(product, updates);
      }
    }
  }

export default memoryMessages;