const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const { validateEmailBD, validatePassword } = require('../../utils/validator')
const { generateToken } = require('../../utils/jwt')

//se obtienen los datos de los usuarios que provengan del front (1.1)
//guardar los datos en la coleccion de la BD (1.2)
//devolver una respuesta (1.3)

const add = async (req, res) => {
  try {
    //obtenemos los datos del front (1.1)
    const { name, surname, email, password } = req.body
    //creamos los datos de usuario con la estructura de models
    const newUser = new User({
      name: name,
      surname: surname,
      email: email,
      password: password,
      role: 'user'
    })
    //console.log('newUser: ', newUser)

    //En este paso evitamos que se cree un usuario ya existente
    
    //validar Email
    const valEmail = await validateEmailBD(req.body.email)
    console.log(valEmail) //Devuelve null si no encuentra el Email en la BD
    if (!valEmail) {
      //La contraseña debe cumplir con el patron requerido
      const valPassword = validatePassword(req.body.password)
      if (valPassword) {
        //Encriptar la contraseña antes de hacer el registro
        newUser.password = bcrypt.hashSync(newUser.password, 10)
        const createdUser = await newUser.save()
        // devolver respuesta (1.3)
        return res.status(200).json({
          succes: true,
          data: createdUser
        })
      } else {
        return res.status(200).json({
          success: false,
          message: 'La contraseña no cumple con los parametros'
        })
      }
    }
    return res.status(200).json({
      success: false,
      message: 'El correo ya está registrado'
    })
  } catch (error) {
    // devolver respuesta (1.3)
    console.log(error)
    return res.status(500).json(error);
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

//Validaremos el Email
const login = async (req, res) => {
  try {
    const userBody = req.body
    //buscamos y validamos el usuario por su email
    const userDB = await validateEmailBD(userBody.email)
    //si no se encuentra usuario:
    if (!userDB) {
      return res
        .status(200)
        .json({ succes: false, message: 'El email no esta registrado' })
    }
    //si no coinciden las contraseñas:
    if (!bcrypt.compareSync(userBody.password, userDB.password)) {
      return res
        .status(200)
        .json({ succes: false, message: 'contraseña invalida' })
    }

    //generamos el token
    const token = generateToken({
      name: userDB.name,
      email: userDB.email,
      _id: userDB.id
    })

    const findUser = await User.findOne({ _id: userDB.id }).populate('userInvoices')

    return res.status(200).json({ succes: true, token: token, user: findUser })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
    
  }
}

const modifyProfile = async (req, res) => {
  console.log('función de modificar')
  console.log(req.userProfile)
  const newProfile = new Profile(req.body)
  newProfile.password = bcrypt.hashSync(req.body.password, 10)
  newProfile._id = req.userProfile._id
  const updateUser = await User.findByIdAndUpdate(
    req.userProfile._id,
    newProfile,
    { new: true }
  )
  return res.status(200).json({ data: updateUser })
}

//relacionar una factura con un usuario
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
      return res.status(404).json({
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

//Obtener las facturas relacionadas con un usuario
const getUserInvoices = async (req, res) => {
  try {
    const { id } = req.params
    const findUser = await User.findOne({ _id: id }).populate('userInvoices')

    if (!findUser) {
      return res
        .status(404)
        .json({ message: 'Error 404: usuario no encontrado.' })
    }

    return res.status(200).json(findUser.userInvoices)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

module.exports = {
  add,
  updateProfile,
  deleteUserID,
  getUserById,
  login,
  modifyProfile,
  asignInvoice,
  getUserInvoices
}
