const knexConfig = require('../config')
const knex = require('knex')(knexConfig)

knex.schema.createTable('products', table => {
    table.increments('id'),
    table.string('name'),
    table.string('code'),
    table.float('price'),
    table.integer('stock')
}).then(() => console.info('Products table created'))
.catch(e => console.error(e))
.finally(() => knex.destroy())