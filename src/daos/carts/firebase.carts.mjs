import { getFirebaseConfig } from "../config.js";

class firebaseCarts {
  constructor() {
    this.config = getFirebaseConfig();
    firebase.initializeApp(this.config);

    // Initialize the Firebase admin app
    firebaseAdmin.initializeApp();

    // Get a reference to the Firestore database
    this.db = firebaseAdmin.firestore();
  }

  async updateCart(id, data) {
    // Update the cart document in the database
    await this.db.collection("carts").doc(id).set(data, { merge: true });
  }

  // Get a cart by its id
  async getCart(id) {
    // Get the cart document from the database
    const cartDoc = await this.db.collection("carts").doc(id).get();

    // Return the cart data if the document exists, or null if it does not exist
    return cartDoc.exists ? cartDoc.data() : null;
  }

  // Delete a cart by its id
  async deleteCart(id) {
    // Delete the cart document from the database
    await this.db.collection("carts").doc(id).delete();
  }

  // Get all carts
  async getCarts() {
    // Get all cart documents from the database
    const cartDocs = await this.db.collection("carts").get();

    // Return the cart data for all documents
    return cartDocs.docs.map((doc) => doc.data());
  }

  // Create a cart
  async createCart(data) {
    // Add the cart data to the database as a new document
    const cartRef = await this.db.collection("carts").add(data);

    // Return the cart id
    return cartRef.id
  }
}

export default firebaseCarts;