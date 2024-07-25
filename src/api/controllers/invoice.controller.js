const Invoice = require('../models/invoice.model')

//Obtener las facturas relacionadas con un usuario
const getInvoiceByUser = async (req, res) => {

  /*const { year, month, week, day, empresa } = req.query

  let filtros = {}
  if (year) filtros.fecha = { $year: year }
  if (month) filtros.fecha = { $month: month }
  if (week) filtros.fecha = { $week: week }
  if (day) filtros.fecha = { $dayOfMonth: day }
  if (empresa) filtros.empresa = empresa


  try {
    const facturas = await Invoice.find(filtros)
    res.status(200).json(facturas)
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al obtener facturas', error })
  }*/
}

//obtener una factura por su Id
const getInvoiceById = async (req, res) => {

    /*const { year, month, week, day, empresa } = req.query
  
    let filtros = {}
    if (year) filtros.fecha = { $year: year }
    if (month) filtros.fecha = { $month: month }
    if (week) filtros.fecha = { $week: week }
    if (day) filtros.fecha = { $dayOfMonth: day }
    if (empresa) filtros.empresa = empresa
  
    //comprobar permiso para ver la factura??
  
    try {
      const facturas = await Invoice.find(filtros)
      res.status(200).json(facturas)
    } catch (error) {
      res.status(400).json({ mensaje: 'Error al obtener facturas', error })
    }*/
  }

//Subir una factura, relacionada con un usuario
const postInvoice = async (req, res) => {

  try {
    console.log(req.body)
    const newInvoice = new Invoice(req.body)
    
    const createdInvoice = await newInvoice.save()
    return res.json(createdInvoice)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

//Editar una factura by Id de la factura
const updateInvoice = async (req, res) => {}

//Eliminar una factura by Id de la factura
const deleteInvoice = async (req, res) => {}

module.exports = { getInvoice, postInvoice }
