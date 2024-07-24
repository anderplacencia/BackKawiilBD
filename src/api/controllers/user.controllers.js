const User = require("../models/user.model");

const add = async (req, res) => {
    try{
        //obtenemos los datos del front
        const body = req.body;
        //creamos los datos de usuario con la estructura de models
        const newUser = new User (body);
        //guardar datos en la coleccion de BD
        const createdUser = await newUser.save();
        console.log("holis");
        return res.json({
            succes: true,
            student: createdUser,
        });
    } catch(error){
        console.log(error);
    };
    //se obtienen los datos de los usuarios que provengan del front
    //guardar los datos en la coleccion de la BD
    //devolver una respuesta
};


module.exports = {add};