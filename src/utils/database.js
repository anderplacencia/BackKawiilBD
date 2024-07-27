const mongoose = require("mongoose");
const env = require('dotenv')

env.config()
const uri = process.env.MONGO_URI

const connectDB = async () => 
    {
        try {
            const db = await mongoose.connect(uri);

            const { name, host } = db.connection;
            console.log(`Nombre de la BD ${name} host: ${host}`);
        } catch (error) {
            console.log(error)
        }
    };

module.exports = { connectDB };


