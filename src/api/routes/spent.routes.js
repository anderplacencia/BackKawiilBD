const express = require("express");
const {crearGasto, obtenerGastos, eliminarGasto, modificarGasto} = require("../controllers/spent.controllers");

const routerSpent = express.Router();
const { protect, restrictTo, restrictToSelf } = require('../middlewares/auth.middlware');

routerSpent.post("/addSpent", crearGasto);
routerSpent.get("/getSpent", obtenerGastos);
routerSpent.delete("/deleteSpent/:id", eliminarGasto);
routerSpent.put("/updateSpent/:id", modificarGasto);
//

module.exports = routerSpent;