const mongoose = require("mongoose")

const connectDatabase = async ()=> {
try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MONGODB has been connected: ${conn.connection.host}`)
} catch (error) {
    console.error(`Error ${error.message}`)
    process.exit(1);
}
}

module.exports = connectDatabase;