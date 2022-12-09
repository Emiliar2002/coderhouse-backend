class memoryCarts {
  constructor() {
    this.carts = []; // initialize an empty array to store carts
  }

  // method to list all carts in the memory array
  getCarts() {
    return this.carts;
  }

  // method to find a cart by id
  getCart(id) {
    return this.carts.find(cart => cart.id === id);
  }

  // method to add a cart to the memory array
  createCart(cart) {
    this.carts.push(cart);
  }

  // method to delete a cart by id
  deleteCart(id) {
    this.carts = this.carts.filter(cart => cart.id !== id);
  }

  // method to modify a cart by id
  editCart(id, updates) {
    const cart = this.findById(id);
    if (cart) {
      Object.assign(cart, updates);
    }
  }
}

export default memoryCarts;