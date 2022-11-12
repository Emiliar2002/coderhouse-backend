const fs = require("fs");
const jsonPath = __dirname + "/products.json";
const _ = require("lodash");

class ProductService {
  constructor() {}

  async createProduct(data) {
    try {
      const jsonData = await (await this.getProducts()).data;
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

  async getProducts() {
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

  async getProduct(uuid) {
    try {
      const data = await (await this.getProducts()).data;
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

  async updateProduct(uuid, data) {
    try {
      let product = await (await this.getProduct(uuid)).data;
      if (_.isEmpty(product)) throw new Error("No product found");
      await this.deleteProduct(uuid);
      product = { ...product, ...data, uuid };
      await this.createProduct(product);
      return{
        success: true,
        data: product
      }
    } catch (e) {
        console.error(e)
      return{
        success: false,
        message: e.message
    }
}
  }

  async deleteProduct(uuid) {
    try {
      const jsondata = await (await this.getProducts()).data;
      const newData = jsondata.filter((i) => i.uuid !== uuid);
      await writeJSON(newData);
      return{
        success: true,
        data: `Product ${uuid} deleted`
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

module.exports = ProductService;
