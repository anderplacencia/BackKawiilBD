const Spent = require('../models/spent.model');
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
const eliminarGasto = async (req, res) => {
  try {
    const gasto = await Gasto.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!gasto) {
      return res.status(404).json({ message: 'Gasto no encontrado' });
    }
    res.status(200).json({ message: 'Gasto eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Editar un gasto by Id del gasto
const modificarGasto = async (req, res) => {
  try {
    const { id } = req.params
    const body = new Gasto(req.body)
    body._id = id
    console.log(body);
    const cambiarGasto = await Gasto.findByIdAndUpdate(id,body, { new: true })
    if (!cambiarGasto)
      {
      return res.status(404).json({ message: 'Error 404: Gasto no encontrado.' })
    }
    console.log(cambiarGasto);
    return res.status(200).json(cambiarGasto)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}
module.exports = {
  crearGasto,
  obtenerGastos,
  eliminarGasto,
  modificarGasto

};
