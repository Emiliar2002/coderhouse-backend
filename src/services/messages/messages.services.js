
const Daos = require("../../daos")('messages');
class MessagesService {

  constructor(){
    Daos.then((r) =>{
      r.connect()
      this.connection = r
    })
  }


  async createMessage(message) {
    try{
      const data = await this.connection.createMessage(message)
      return {
        success: true,
        data
      }
      }catch(e){
        console.error(e.message)
        return {
          success: false,
          data: e.message
        }
      }
    
  }

  async getMessages() {
    try{
    const data = await this.connection.getMessages()
    console.log(data)
    return {
      success: true,
      data
    }
    }catch(e){
      console.error(e)
      return {
        success: false,
        data: e.message
      }
    }
  }

}

module.exports = MessagesService;