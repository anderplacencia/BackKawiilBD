const Gasto = require('../models/spent.model');

const crearGasto = async (req, res) => {

  try {
    const body = req.body;

    const nuevoGasto = new Gasto(body);

    const crearGasto = await nuevoGasto.save();
    return res.json(crearGasto);
} catch(error){
  // devolver respuesta (1.3)
  console.log(error);
};
};

// Obtener gastos
const obtenerGastos = async (req, res) => {
  const { usuarioId } = req.query;

  try {
    const gastos = await Gasto.find({ usuarioId });
    res.status(200).json(gastos);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al obtener los gastos', error });
  }
};

module.exports = {
  crearGasto,
  obtenerGastos
};
