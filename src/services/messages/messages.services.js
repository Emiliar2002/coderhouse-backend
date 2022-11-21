
const knexConfig = require('../database/sqlite.config');


class MessagesService {
  constructor() {
    this.knex = require('knex')(knexConfig)
  }


  async createMessage(message) {
    try {
      const msgPromise = (message) => new Promise((resolve, reject) => {
        this.knex('messages').insert(message).then(() => {
          console.log(message)
            resolve(message);
        }).catch(err => {
            reject(err)
        }).finally(() =>{
            this.knex.destroy();
        });
    })

    const data = await msgPromise(message)

    return{
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
      const data = await this.knex('messages').select('*');
      console.log(data)
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

module.exports = MessagesService;