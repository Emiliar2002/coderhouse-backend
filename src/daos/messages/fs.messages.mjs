
import fs from 'fs'
const jsonPath = __dirname + "/storage/fs.json";
import _ from 'lodash'

class fsMessages {
  constructor() {}

  async createMessage(data) {
    try {
      const jsonData = await (await this.getMessages()).data;
      jsonData.push(data);
      await writeJSON(jsonData);
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

  async getMessage(uuid) {
    try {
      const data = await (await this.getMessages()).data;
      return{
        success: true,
        data: data.filter((i) => i.uuid === uuid)[0]
      } 
    } catch (e) {
            console.error(e)
          return{
            success: false,
            message: e.message
        }
    }
  }

  async updateMessage(uuid, data) {
    try {
      let message = await (await this.getMessage(uuid)).data;
      if (_.isEmpty(message)) throw new Error("No message found");
      await this.deleteMessage(uuid);
      message = { ...message, ...data, uuid };
      await this.createMessage(message);
      return{
        success: true,
        data: message
      }
    } catch (e) {
        console.error(e)
      return{
        success: false,
        message: e.message
    }
}
  }

  async deleteMessage(uuid) {
    try {
      const jsondata = await (await this.getMessages()).data;
      const newData = jsondata.filter((i) => i.uuid !== uuid);
      await writeJSON(newData);
      return{
        success: true,
        data: `Message ${uuid} deleted`
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

export default fsMessages