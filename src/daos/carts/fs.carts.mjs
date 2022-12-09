
import fs from 'fs'
const jsonPath = __dirname + "/storage/fs.json";
import _ from 'lodash'

class fsCarts {
  constructor() {}

  async createCart(data) {
    try {
      const jsonData = await (await this.getCarts()).data;
      jsonData.push(data);
      await writeJSON(jsonData);
      return {
        success: true,
        data: data,
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: e.message,
      };
    }
  }

  async getCarts() {
    try {
      const data = JSON.parse(await fs.promises.readFile(jsonPath));
      return {
        success: true,
        data: data,
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: e.message,
      };
    }
  }

  async getCart(uuid) {
    try {
      const data = await (await this.getCarts()).data;
      return {
        success: true,
        data: data.filter((i) => i.uuid === uuid)[0],
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: e.message,
      };
    }
  }

  async updateCart(uuid, data) {
    try {
      let cart = await (await this.getCart(uuid)).data;
      if (_.isEmpty(cart)) throw new Error("No cart found");
      await this.deleteCart(uuid);
      cart = { ...cart, ...data, uuid };
      await this.createCart(cart);
      return {
        success: true,
        data: cart,
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: e.message,
      };
    }
  }

  async deleteCart(uuid) {
    try {
      const jsondata = await (await this.getCarts()).data;
      const newData = jsondata.filter((i) => i.uuid !== uuid);
      await writeJSON(newData);
      return {
        success: true,
        data: `Cart ${uuid} deleted`,
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: e.message,
      };
    }
  }
}

async function writeJSON(data) {
  await fs.promises.writeFile(jsonPath, JSON.stringify(data, null, 2));
}

export default fsCarts;