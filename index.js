//import de dependencias
const express = require("express");
const { connectBD, connectDB } = require("./src/utils/database");
const routerUSer = require("./src/api/routes/user.routes")
const routerSpent = require("./src/api/routes/spent.routes")

//Configuración del servidor
const serve = express();
serve.use(express.json());
connectDB();

//Configiracion del servidor con las rutas
serve.use("/spent", routerSpent);
serve.use("/user", routerUSer);


//servidor ejecutandose
const PORT = 5000;
serve.listen(PORT, () =>{
    console.log (`Escuchando puerto http://localhost:${PORT}`);
});