import { getFirebaseConfig } from "../config.js"
import firebaseAdmin from 'firebase-admin'

class firebaseMessages {
  constructor() {
    this.config = getFirebaseConfig()
    firebaseAdmin.initializeApp(this.config);
    this.db = firebaseAdmin.firestore();
    this.query = this.db.collection('messages')
  }

  async updateMessage(id, data) {
    // Update the message document in the database
    await this.query.doc(id).set(data, { merge: true });
  }

  // Get a message by its id
  async getMessage(id) {
    // Get the message document from the database
    const messageDoc = await this.query.doc(id).get();

    // Return the message data if the document exists, or null if it does not exist
    return messageDoc.exists ? messageDoc.data() : null;
  }

  // Delete a message by its id
  async deleteMessage(id) {
    // Delete the message document from the database
    await this.query.doc(id).delete();
  }

  // Get all messages
  async getMessages() {
    // Get all message documents from the database
    const messageDocs = await this.query.get();

    // Return the message data for all documents
    return messageDocs.docs.map((doc) => doc.data());
  }

  // Create a message
  async createMessage(data) {
    // Add the message data to the database as a new document
    const messageRef = await this.query.add(data);

    // Return the message id
    return messageRef.id;
  }
}

export default firebaseMessages