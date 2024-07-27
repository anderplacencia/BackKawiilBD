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
exports.eliminarGasto = async (req, res) => {
  try {
    const gasto = await Spent.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!gasto) {
      return res.status(404).json({ message: 'Gasto no encontrado' });
    }
    res.status(200).json({ message: 'Gasto eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.modificarGasto = async (req, res) => {
  try {
    const gasto = await Spent.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!gasto) {
      return res.status(404).json({ message: 'Gasto no encontrado' });
    }
    res.status(200).json(gasto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  crearGasto,
  obtenerGastos,
  eliminarGasto,
  modificarGasto

};
