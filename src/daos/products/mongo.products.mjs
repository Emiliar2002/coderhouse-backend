const mongoose = require("mongoose");
const {getMongoCreds} = require('../config')

class mongoProducts {
  constructor() {
    this.connectionString = getMongoCreds();

    // Define the schema for product documents
    this.ProductSchema = new mongoose.Schema({
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
    });

    // Create a model for product documents
    this.Product = mongoose.model("Product", this.ProductSchema);
  }

  // Connect to the database
  async connect() {
    await mongoose.connect(this.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  // Get a product by its _id
  async getProduct(id) {
    // Find the product by its _id
    const product = await this.Product.findById(id);

    // Return the product if it was found, or null if it was not found
    return product || null;
  }

  // Delete a product by its _id
  async deleteProduct(id) {
    // Delete the product by its _id
    const product = await this.Product.findByIdAndDelete(id);

    // Return the deleted product if it was found, or null if it was not found
    return product || null;
  }

  // Get all products
  async getProducts() {
    // Find all products
    const products = await this.Product.find();

    // Return the products
    return products;
  }

  // Update a product by its _id
  async editProduct(id, data) {
    // Update the product by its _id
    const product = await this.Product.findByIdAndUpdate(id, data, {
      new: true,
    });

    // Return the updated product if it was found, or null if it was not found
    return product || null;
  }

  async createProduct(data) {
    // Create a new product document
    const product = new this.Product(data);

    // Save the product to the database
    await product.save();

    // Return the product
    return product;
  }
}

export default mongoProducts