const dotenv = require('dotenv')
dotenv.config()

const getMongoCreds = () => {
    return process.env.mongo
}

const getFirebaseConfig = () => {
    return {

    }
}

module.exports = {getMongoCreds, getFirebaseConfig}