const express = require("express");
const {add, updateProfile, deleteUserID, getUserById} = require("../controllers/user.controllers");

const routerUSer = express.Router();

routerUSer.post("/addUser", add);
routerUSer.put("/editUser/:id", updateProfile);
routerUSer.delete("/deleteUser/:id", deleteUserID);
routerUSer.get("/getUser/:id", getUserById);

module.exports = routerUSer;