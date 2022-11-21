const options = {
    client: 'sqlite3',
    connection: {
        filename: __dirname + '/ecommerce.sqlite'
    },
    useNullAsDefault: true
}

module.exports = options