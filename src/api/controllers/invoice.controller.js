const Invoice = require('../models/invoice.model')


//Subir una factura, relacionada con un usuario
const postInvoice = async (req, res) => {
  try {
    const body = req.body //obtener los datos de la petición del front
    const newInvoice = new Invoice(body) //guardar los datos en formato Invoice
    const createdInvoice = await newInvoice.save()
    return res.json(createdInvoice)
  } catch (error) {
    return res.status(500).json(error)
  }
}

//obtener una factura por su Id
const getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params // Se pasa el id en la ruta
    //el id lo define mongo al hacer un post
    const findInvoice = await Invoice.findOne({ _id: id })
    return res.status(200).json(findInvoice)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}



//Editar una factura by Id de la factura
const updateInvoiceById = async (req, res) => {
  try {
    const { id } = req.params
    const invoiceBody = new Invoice(req.body)
    invoiceBody._id = id
    const updateInvoice = await Invoice.findByIdAndUpdate(id, invoiceBody, { new: true })
    console.log(updateInvoice)
    if (!updateInvoice) {
      return res.status(404).json({ message: 'Error 404: Factura no encontrada.' })
    }
    return res.status(200).json(updateInvoice)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

//Eliminar una factura by Id de la factura
const deleteInvoiceById = async (req, res) => {
  try {
    const id = req.params.id
    const deleteInvoice = await Invoice.findByIdAndDelete(id)

    if (!deleteInvoice) {
      return res
        .status(404)
        .json({ message: 'Error 404: factura no encontrada.' })
    }
    return res.status(200).json(deleteInvoice)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

module.exports = {
  postInvoice,
  getInvoiceById,
  updateInvoiceById,
  deleteInvoiceById
}