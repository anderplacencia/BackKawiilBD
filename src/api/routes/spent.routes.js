const express = require("express");
const {add} = require("../controllers/spent.controllers");

const routerSpent = express.Router();

routerUSer.post("/addSpent", add);

module.exports = routerSpent;