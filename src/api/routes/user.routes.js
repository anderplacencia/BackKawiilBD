const express = require("express");
const {add} = require("../controllers/user.controllers");

const routerUSer = express.Router();

routerUSer.post("/addUser", add);

module.exports = routerUSer;