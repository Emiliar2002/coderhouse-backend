const dotenv = require('dotenv')
dotenv.config()

const getMongoCreds = () => {
    const {MONGODB_URL, MONGODB_USER, MONGODB_PASSWORD, MONGODB_DB} = process.env
    const connectionString = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`
    return connectionString
}

const getFirebaseConfig = () => {
    return {

    }
}

module.exports = {getMongoCreds, getFirebaseConfig}