import { getFirebaseConfig } from "../config.js"
import firebaseAdmin from 'firebase-admin'

class firebaseCarts {
  constructor() {
    this.config = getFirebaseConfig();
    firebaseAdmin.initializeApp(this.config);
    this.db = firebaseAdmin.firestore();
    this.query = this.db.collection('carts');
  }

  async updateCart(id, data) {
    // Update the cart document in the database
    await this.query.doc(id).set(data, { merge: true });
  }

  // Get a cart by its id
  async getCart(id) {
    // Get the cart document from the database
    const cartDoc = await this.query.doc(id).get();

    // Return the cart data if the document exists, or null if it does not exist
    return cartDoc.exists ? cartDoc.data() : null;
  }

  // Delete a cart by its id
  async deleteCart(id) {
    // Delete the cart document from the database
    await this.query.doc(id).delete();
  }

  // Get all carts
  async getCarts() {
    // Get all cart documents from the database
    const cartDocs = await this.query.get();

    // Return the cart data for all documents
    return cartDocs.docs.map((doc) => doc.data());
  }

  // Create a cart
  async createCart(data) {
    // Add the cart data to the database as a new document
    const cartRef = await this.query.add(data);

    // Return the cart id
    return cartRef.id
  }
}

export default firebaseCarts;