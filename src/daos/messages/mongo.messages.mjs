import mongoose from 'mongoose'
import { getMongoCreds } from "../config.js";
import normalize from 'normalize-mongoose'

class MongoMessages {
  constructor() {
    this.connectionString = getMongoCreds();

    // Define the schema for messages documents
    this.messagesSchema = new mongoose.Schema({
      author: {
        email: {type: String, required:true},
        name: {type: String, required:true},
        lastname: {type: String, required:true},
        age: {type: Number, required: true},
        alias: {type: String, required:true},
        avatar: {type: String, required:true},
      },
      text: {type: String, required: true}
    }).plugin(normalize);

    // Create a model for messages documents
    this.messages = mongoose.model("messages", this.messagesSchema);
  }

  // Connect to the database
connect() {
     mongoose.connect(this.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  // Get a messages by its _id
  async getMessage(id) {
    // Find the messages by its _id
    const messages = await this.messages.findById(id);

    // Return the messages if it was found, or null if it was not found
    return messages || null;
  }

  // Delete a messages by its _id
  async deleteMessage(id) {
    // Delete the messages by its _id
    const messages = await this.messages.findByIdAndDelete(id);

    // Return the deleted messages if it was found, or null if it was not found
    return messages || null;
  }

  // Get all messages
  async getMessages() {
    // Find all messages
    const messages = await this.messages.find();

    // Return the messages
    return messages;
  }

  // Update a messages by its _id
  async editMessage(id, data) {
    // Update the messages by its _id
    const messages = await this.messages.findByIdAndUpdate(id, data, {
      new: true,
    });

    // Return the updated messages if it was found, or null if it was not found
    return messages || null;
  }

  async createMessage(data) {
    // Create a new message document
    const messages = new this.messages({...data});

    // Save the messages to the database
    const saved = await messages.save();
    return saved
  }
}

export default MongoMessages;