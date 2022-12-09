import mongoose from 'mongoose'
import { getMongoCreds } from "../config.js";
import { v4 } from 'uuid';

class mongoCarts {
  constructor() {
    this.connectionString = getMongoCreds();

    // Define the schema for cart documents
    this.CartSchema = new mongoose.Schema({
      products: {type: Array, required:true},
      code: {type: String, required:true}
    });

    // Create a model for cart documents
    this.Cart = mongoose.model("Cart", this.CartSchema);
  }

  // Connect to the database
  async connect() {
    await mongoose.connect(this.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  // Get a cart by its _id
  async getCart(id) {
    // Find the cart by its _id
    const cart = await this.Cart.findById(id);

    // Return the cart if it was found, or null if it was not found
    return cart || null;
  }

  // Delete a cart by its _id
  async deleteCart(id) {
    // Delete the cart by its _id
    const cart = await this.Cart.findByIdAndDelete(id);

    // Return the deleted cart if it was found, or null if it was not found
    return cart || null;
  }

  // Get all carts
  async getCarts() {
    // Find all carts
    const carts = await this.Cart.find();

    // Return the carts
    return carts;
  }

  // Update a cart by its _id
  async editCart(id, data) {
    // Update the cart by its _id
    const cart = await this.Cart.findByIdAndUpdate(id, data, {
      new: true,
    });

    // Return the updated cart if it was found, or null if it was not found
    return cart || null;
  }

  async createCart(data) {
    // Create a new cart document
    const cart = new this.Cart({...data, code: v4()});

    // Save the cart to the database
    await cart.save();

    // Return the cart
    return cart;
  }
}

export default mongoCarts;