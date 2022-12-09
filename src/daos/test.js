const dotenv = require('dotenv')
dotenv.config()
const daos = require('./index.js')

const test = async () => {
    const productDaos = await daos('products')
    const connection = await productDaos.connect()
}