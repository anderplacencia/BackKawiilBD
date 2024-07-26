const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { validateEmailBD, validatePassword } = require("../../utils/validator");
const { generateToken } = require("../../utils/jwt")

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
        //validar Email
        const valEmail = await validateEmailBD(req.body.Email);
        console.log(valEmail); //Devuelve null si no encuentra el Email en la BD
        if(!valEmail) {
          //La contraseña debe cumplir con el patron requerido
          const valPassword = validatePassword(req.body.password)
          if(valPassword){
            //Encriptar la contraseña antes de hacer el registro
            newUser.password = bcrypt.hashSync(newUser.password, 10);
            const createdUserP = await newUser.save();
            return res.status(200).json({success: true, data: createdUserP});
          }else{
            return res.status(200).json({success: false, message: "La contraseña no cumple con los parametros"});
          }
        }
        return res.status(200).json({success: false, message: "El Email ya está registrado"});
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
      const { id } = req.params
      const userBody = new User(req.body)
      userBody._id = id
      const editedUser = await User.findByIdAndUpdate(id, userBody, { new: true })
      console.log(editedUser)
      if (!editedUser) {
        return res.status(404).json({ message: 'Error 404: usuario no encontrado.' })
      }
      return res.status(200).json(editedUser)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }

//Eliminar una usuario by Id de la BD
const deleteUserID = async (req, res) => {
    try {
      const id = req.params.id
      const deleteUser = await User.findByIdAndDelete(id)
  
      if (!deleteUser) {
        return res
          .status(404)
          .json({ message: 'Error 404: Usuario no encontrada.' })
      }
      return res.status(200).json(deleteUser)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }

  //obtener una usuario por su Id
const getUserById = async (req, res) => {
    //comprobar permiso para ver la factura??
    try {
      const { id } = req.params // Se pasa el id en la ruta
      //el id lo define mongo al hacer un post
      const findUser = await User.findOne({ _id: id })
      return res.status(200).json(findUser)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }

  //Validaremos el Email
const login = async (req, res) => {
  try {
    const userBody = req.body;
    const userDB = await validateEmailBD(userBody.Email);
    if(!userDB){
      return res.status(200).json({succes: false, message:"El email no esta registrado"})
    }
    if(!bcrypt.compareSync(userBody.password, userDB.password))
    return res.status(200).json({succes: true, message:"contraseña invalida"})

    //generamos el token
    const token = generateToken({
      name: userDB.name,
      email: userDB.email,
      _id: userDB.id

    })
    return res.status(200).json({succes: true, token: token})


  } catch (error) {
    return res.status(500).json(error)
  }
}

const modifyProfile = async (req, res) => {
  console.log("función de modificar");
  console.log(req.userProfile);
  const newProfile = new Profile(req.body);
  newProfile.password = bcrypt.hashSync( req.body.password, 10 );
  newProfile._id = req.userProfile._id;
  const updateUser = await User.findByIdAndUpdate(req.userProfile._id, newProfile, {new: true} )
  return res.status(200).json({data:updateUser})
}


module.exports = {add, updateProfile, deleteUserID, getUserById, login, modifyProfile };