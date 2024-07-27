//import de dependencias
const express = require('express')
const { connectDB } = require('./src/utils/database')
const routerUSer = require('./src/api/routes/user.routes')
const routerInvoice = require('./src/api/routes/invoice.routes')
const env = require('dotenv')
const cloudinary = require('cloudinary').v2

env.config() //variable de entorno para configurar el servidor

//configurar conexion a cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUD,
  api_secret: process.env.API_SECRET_CLOUD
})
const routerSpent = require("./src/api/routes/spent.routes")

//Configuración del servidor
const serve = express()
serve.use(express.json())
connectDB()

//Configuracion del servidor con las rutas
serve.use("/spent", routerSpent);
serve.use('/user', routerUSer)
serve.use('/invoice', routerInvoice)


//servidor ejecutandose
const PORT = 5000
serve.listen(PORT, () => {
  console.log(`Escuchando puerto http://localhost:${PORT}`)
})
