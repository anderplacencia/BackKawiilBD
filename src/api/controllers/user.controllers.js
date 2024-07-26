const User = require('../models/user.model')

//se obtienen los datos de los usuarios que provengan del front (1.1)
//guardar los datos en la coleccion de la BD (1.2)
//devolver una respuesta (1.3)

const add = async (req, res) => {
  try {
    //obtenemos los datos del front (1.1)
    const body = req.body
    //creamos los datos de usuario con la estructura de models
    const newUser = new User(body)
    //En este paso evitamos que se cree un usuario ya existente
    const findUser = await User.find({ name: req.body.name })
    if (findUser.length !== 0) {
      return res.json({ message: 'Este usuario ya existe' })
    }
    //guardar datos en la coleccion de BD (1.2)
    const createdUser = await newUser.save()
    //console.log("holis");
    // devolver respuesta (1.3)
    return res.json({
      succes: true,
      student: createdUser
    })
  } catch (error) {
    // devolver respuesta (1.3)
    console.log(error)
  }
}

// Actualizar perfil del usuario
const updateProfile = async (req, res) => {
  try {
    const { id } = req.params
    const userBody = new User(req.body)
    userBody._id = id
    const editedUser = await User.findByIdAndUpdate(id, userBody, { new: true })
    console.log(editedUser)
    if (!editedUser) {
      return res
        .status(404)
        .json({ message: 'Error 404: usuario no encontrado.' })
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

const asignInvoice = async (req, res) => {
  try {
    const idUser = req.params.id //coge el idUser en la ruta
    const idInvoice = req.body.id //coge el idInvoice del body de la request
    console.log(idUser, idInvoice)

    const checkUser = await User.findOne({ _id: idUser })

    if (!checkUser) {
      return res
        .status(404)
        .json({ message: 'Error 404: usuario no encontrado.' })
    }

    if (checkUser.userInvoices.includes(idInvoice)) {
      return res
        .status(404)
        .json({
          message: 'Error: esa factura ya está asignada a este usuario.'
        })
    }

    //añadir comprobacion de que el id de la factura corresponde a una factura existente???##########################################################################################################################################

    const editedUser = await User.findByIdAndUpdate(
      idUser,
      { $push: { userInvoices: idInvoice } },
      { new: true }
    )

    return res.status(200).json(editedUser)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

module.exports = { add, updateProfile, deleteUserID, getUserById, asignInvoice }
