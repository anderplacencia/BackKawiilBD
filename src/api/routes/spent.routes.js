const express = require("express");
const {crearGasto, obtenerGastos} = require("../controllers/spent.controllers");

const routerSpent = express.Router();

routerSpent.post("/addSpent", crearGasto);
routerSpent.get("/getSpent", obtenerGastos);

module.exports = routerSpent;