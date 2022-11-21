const knexConfig = require('../config')
const knex = require('knex')(knexConfig)

knex.schema.createTable('products', table => {
    table.increments('id'),
    table.string('name'),
    table.string('image'),
    table.string('description'),
    table.string('code'),
    table.float('price'),
    table.integer('stock'),
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
}).then(() => console.info('Products table created'))
.catch(e => console.error(e))
.finally(() => knex.destroy())