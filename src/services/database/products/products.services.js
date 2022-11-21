const knexConfig = require('../config');
const knex = require('knex');
const { v4: uuidv4 } = require('uuid');

class ProductService {
  constructor() {
    this.knex = knex(knexConfig);
  }

  async createProduct(product){
    Object.assign(product, {
        code: uuidv4()
    })
    return new Promise((resolve, reject) => {
        this.knex('products').insert(product).then(() => {
          console.log(product)
            resolve({
                success: true,
                data: product
            });
        }).catch(err => {
            reject(err)
        }).finally(() =>{
            this.knex.destroy();
        });
    })

}

  async getProducts() {
    try {
      const data = await this.knex('products').select('*');
      return {
        success: true,
        data: data,
      }
    } catch (e) {
        console.error(e)
      return{
        success: false,
        data: e.message
      }
    }
  }

  async getProduct(code){
    try{
        const data = await this.knex('products').where('code', '=', code).select('*');
        if(data.length == 0){
            return {
                success: true,
                message: 'Product not found'
            }
        }
        const proudctFormatted = JSON.parse(JSON.stringify(data[0]));
        return {
            success: true,
            data: proudctFormatted
        }
    }catch(err){
        console.error(err);
        return {
            success: false,
            data: err.message
        }
    }
}

  async updateProduct(code, data) {
    return new Promise((resolve, reject) => {
      this.knex('products').where('code', '=', code).update(data).then(() => {
          resolve({
              success: true,
              data: 'Product succesfully updated.'
          });
      }).catch(err => {
          reject(err)
      }).finally(() =>{
          this.knex.destroy();
      });
  })
  }

  async deleteProduct(code) {
    try{
      const data = await this.knex('products').where('code', '=', code).delete('*');
      return {
          success: true,
          data: `${data} product${data > 1 ? 's' : ''} deleted.`
      }
  }catch(err){
      console.error(err);
      return {
          success: false,
          data: err.message
      }
  }
  }
}

module.exports = ProductService;
