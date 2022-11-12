const fs = require("fs");
const jsonPath = __dirname + "/messages.json";
const moment = require('moment')

class MessagesService {
  constructor() {}

  async createMessage(message) {
    try {
        //Get current date and add it to message object
        const date = moment().format('MMMM Do YYYY, h:mm:ss a');
        message.date = date


        const data = await (await this.getMessages()).data
        data.push(message)
        await writeJSON(data)
      return {
        success: true,
        data
      }
    } catch (e) {
        console.error(e)
      return{
        success: false,
        message: e.message
      }
    }
    
  }

  async getMessages() {
    try {
      const data = JSON.parse(await fs.promises.readFile(jsonPath));
      return {
        success: true,
        data: data,
      }
    } catch (e) {
        console.error(e)
      return{
        success: false,
        message: e.message
      }
    }
  }

}

async function writeJSON(data) {
  await fs.promises.writeFile(jsonPath, JSON.stringify(data, null, 2));
}

module.exports = MessagesService;