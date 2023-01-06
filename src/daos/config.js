const admin = require("firebase-admin");
const dotenv = require('dotenv');

//tengo que traer las keys en .json de firebase a este directorio y cambiarle el nombre
const serviceAccount = require("./serviceAccountKey.json");

dotenv.config();

const getMongoCreds = () => {
    const {MONGODB_URL, MONGODB_USER, MONGODB_PASSWORD, MONGODB_DB} = process.env
    let {MONGODB_PORT} = process.env
    MONGODB_PORT = parseInt(MONGODB_PORT)
    const connectionString = !isNaN(MONGODB_PORT) ? 
    `mongodb://${MONGODB_URL}:${MONGODB_PORT}/${MONGODB_DB}` 
    : 
    `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_DB}.${MONGODB_URL}?retryWrites=true&w=majority`
    return connectionString
}

const getFirebaseConfig = () => {
    return {
        credential: admin.credential.cert(serviceAccount)
    }
}

module.exports = {getMongoCreds, getFirebaseConfig}