require('dotenv').config()

const knex = {
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST || 'localhost',
      port : process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'ecommerce'
    }
  }

module.exports = knex