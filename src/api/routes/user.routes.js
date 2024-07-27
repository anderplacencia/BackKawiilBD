const express = require("express");
const {add, updateProfile, deleteUserID, getUserById, login, modifyProfile , asignInvoice, getUserInvoices} = require("../controllers/user.controllers");
const { isAuth } = require("../../middleware/auth");

const routerUSer = express.Router();

routerUSer.post("/addUser", add);
routerUSer.put("/editUser/:id", updateProfile);
routerUSer.put("/asignInvoice/:id", asignInvoice);//las invoice se asignan al usuario de manera independiente
routerUSer.delete("/deleteUser/:id", deleteUserID);
routerUSer.get("/getUser/:id", [ isAuth ], getUserById);
routerUSer.post("/login", login);
//guardar el token en local o cookie,
routerUSer.put("/update", [ isAuth ], modifyProfile )
routerUSer.get("/getInvoices/:id", getUserInvoices);

module.exports = routerUSer;