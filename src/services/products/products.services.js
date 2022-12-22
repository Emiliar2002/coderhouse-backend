require('dotenv').config()
const Daos = require("../../daos")('products');

console.log(Daos.then((r) => r.connect()))

class ProductsService{
    constructor(){}


}

module.exports = ProductsService