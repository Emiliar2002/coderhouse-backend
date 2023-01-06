const { getMongoCreds } = require("../daos/config");
const MongoStore = require('connect-mongo')

const store = MongoStore.create({
    ttl: 60,
    mongoUrl: getMongoCreds(),
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  })
  const sessionConfig = {
    secret: process.env.SESSION_SECRET || '12345',
    resave: false,
    saveUninitialized: false,
    store: store
}

module.exports = sessionConfig