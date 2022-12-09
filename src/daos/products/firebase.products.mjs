import { getFirebaseConfig } from "../config.js"
import firebaseAdmin from 'firebase-admin'

class firebaseProducts {
  constructor() {
    this.config = getFirebaseConfig()
    firebaseAdmin.initializeApp(this.config);
    this.db = firebaseAdmin.firestore();
    this.query = this.db.collection('products')
  }

  async updateProduct(id, data) {
    // Update the product document in the database
    await this.query.doc(id).set(data, { merge: true });
  }

  // Get a product by its id
  async getProduct(id) {
    // Get the product document from the database
    const productDoc = await this.query.doc(id).get();

    // Return the product data if the document exists, or null if it does not exist
    return productDoc.exists ? productDoc.data() : null;
  }

  // Delete a product by its id
  async deleteProduct(id) {
    // Delete the product document from the database
    await this.query.doc(id).delete();
  }

  // Get all products
  async getProducts() {
    // Get all product documents from the database
    const productDocs = await this.query.get();

    // Return the product data for all documents
    return productDocs.docs.map((doc) => doc.data());
  }

  // Create a product
  async createProduct(data) {
    // Add the product data to the database as a new document
    const productRef = await this.query.add(data);

    // Return the product id
    return productRef.id;
  }
}

export default firebaseProducts