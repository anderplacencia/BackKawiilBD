const express = require("express");
const {add, updateProfile, deleteUserID, getUserById , asignInvoice} = require("../controllers/user.controllers");

const routerUSer = express.Router();

routerUSer.post("/addUser", add);
routerUSer.put("/editUser/:id", updateProfile);
routerUSer.put("/asignInvoice/:id", asignInvoice);//las invoice se asignan al usuario de manera independiente
routerUSer.delete("/deleteUser/:id", deleteUserID);
routerUSer.get("/getUser/:id", getUserById);

module.exports = routerUSer;