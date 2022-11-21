const fs = require("fs");
const jsonPath = __dirname + "/carritos.json";
const ProductService = require("../database/products/products.services");
const { v4: uuidv4 } = require("uuid");
const productService = new ProductService()

const unsuccessful = (e) => {
  console.error(e)
  return{
    success: false,
    message: e.message
  }
}

class CartService {
  constructor() {}

  async getCart(uuid){
    try {
      const json = await (await this.getAllCarts()).data;
      const data = json.find((i) => i.uuid === uuid)
      return {
        success: true,
        data
      }
    } catch (e) {
      return unsuccessful(e)
    }
  }

  async getAllCarts(){
    try{
       const data = JSON.parse(await fs.promises.readFile(jsonPath));
       return {
        success: true,
        data
      }
    }catch(e){
      return unsuccessful(e)
    }

  }

  async createCart() {
    try {
        const timestamp = Date.now()
        const uuid = uuidv4()
        const cart = {
          uuid,
          timestamp,
          products: [],
        }
        const data = await (await this.getAllCarts()).data;
        data.push(cart)
        await writeJSON(data)
      return {
        success: true,
        data: uuid
      }
    } catch (e) {
      return unsuccessful(e)
    }
    
  }

  async deleteCart(uuid) {
    try {
      const jsondata = await (await this.getAllCarts()).data;
      const newData = jsondata.filter((i) => i.uuid !== uuid);
      await writeJSON(newData);
      return{
        success: true,
        data: `Cart ${uuid} deleted`
      }
    } catch (e) {
      return unsuccessful(e)
    }
  }

  async getCartProducts(uuid) {
    try {
      const data = await (await this.getCart(uuid)).data.products
      return{
        success: true,
        data
      } 
    } catch (e) {
      return unsuccessful(e)
    }
  }

  async addProductsToCart(uuidCart, uuidProd) {
    try {
        const product = await (await productService.getProduct(uuidProd)).data
        const carts = await (await this.getAllCarts()).data
        console.log(carts)
        const data = carts.map(i => {
          if(i.uuid === uuidCart){
            return {
              ...i,
              products: [...i.products, product]
            }
          }
          else return i
        })
        console.log(data)
        await writeJSON(data)
      return {
        success: true,
        data: `${product.name} added to cart ${uuidCart}`
      }
    } catch (e) {
      return unsuccessful(e)
    }
    
  }

  async removeProductFromCart(uuidCart, uuidProd) {
    try {
      const carts = await (await this.getAllCarts()).data
      const data = carts.map(i => {
        if(i.uuid === uuidCart){
          return {
            ...i,
            products: i.products.filter(i => i.uuid !== uuidProd)
          }
        }
        else return i
      })
      await writeJSON(data)
      return{
        success: true,
        data: `Product ${uuidProd} removed from cart ${uuidCart}`
      }
    } catch (e) {
      return unsuccessful(e)
    }
  }

}

async function writeJSON(data) {
  await fs.promises.writeFile(jsonPath, JSON.stringify(data, null, 2));
}



module.exports = CartService;