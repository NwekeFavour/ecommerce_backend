const mongoose = require("mongoose")
const logger = require("../utils/logger.js")

const connectDatabase = async ()=> {
try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    logger.error(`MONGODB has been connected: ${conn.connection.host}`)
} catch (error) {
    logger.error(`Error ${error.message}`)
    process.exit(1);
}
}

module.exports = connectDatabase;