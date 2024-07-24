
const mongoose = require("mongoose");
const uri= "mongodb+srv://andersonplacencia:xNIVVuB05iBr1jhL@cluster0.kdehqza.mongodb.net/KawiilDB?retryWrites=true&w=majority&appName=Cluster0";

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


