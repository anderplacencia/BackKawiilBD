const express = require("express");
const {add, updateProfile, deleteUserID, getUserById, login, modifyProfile} = require("../controllers/user.controllers");
const { isAuth } = require("../../middleware/auth");

const routerUSer = express.Router();

routerUSer.post("/addUser", add);
routerUSer.put("/editUser/:id", updateProfile);
routerUSer.delete("/deleteUser/:id", deleteUserID);
routerUSer.get("/getUser/:id", [ isAuth ], getUserById);
routerUSer.post("/login", login);
//guardar el token en local o cookie,
routerUSer.put("/update", [ isAuth ], modifyProfile )

module.exports = routerUSer;