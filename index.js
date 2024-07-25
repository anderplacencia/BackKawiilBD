//import de dependencias
const express = require("express");
const { connectBD, connectDB } = require("./src/utils/database");
const routerUSer = require("./src/api/routes/user.routes");
const routerInvoice = require("./src/api/routes/invoice.routes");

//Configuración del servidor
const serve = express();
serve.use(express.json());
connectDB();

//Configiracion del servidor con las rutas
serve.use("/user", routerUSer);
serve.use("/invoice", routerInvoice);

//servidor ejecutandose
const PORT = 5000;
serve.listen(PORT, () =>{
    console.log (`Escuchando puerto http://localhost:${PORT}`);
});