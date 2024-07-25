const User = require("../models/user.model");


//se obtienen los datos de los usuarios que provengan del front (1.1)
//guardar los datos en la coleccion de la BD (1.2)
//devolver una respuesta (1.3)

const add = async (req, res) => {
    try{
        //obtenemos los datos del front (1.1)
        const body = req.body;
        //creamos los datos de usuario con la estructura de models
        const newUser = new User (body);
        //En este paso evitamos que se cree un usuario ya existente
        const findUser = await User.find ({ name: req.body.name })
        if (findUser.length !== 0) {
            return res.json({ message: "Este usuario ya existe" })
        }
        //guardar datos en la coleccion de BD (1.2)
        const createdUser = await newUser.save();
        //console.log("holis");
        // devolver respuesta (1.3)
        return res.json({
            succes: true,
            student: createdUser,
        });
    } catch(error){
        // devolver respuesta (1.3)
        console.log(error);
    };
};

// Actualizar perfil del usuario
const updateProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Perfil actualizado con éxito', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el perfil', error: error.message });
    }
}




module.exports = {add, updateProfile};