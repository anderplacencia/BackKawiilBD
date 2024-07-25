const mongoose = require('mongoose');
const schema = mongoose.Schema;

const spentSchema = new schema({
  descripcion: {
    type: String,
    required: true
  },
  importe: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  estadoFactura: {
    type: String,
    enum: ['pendiente', 'pagada', 'vencida'],
    default: 'pendiente'
  },
},
{
    collection: "spent",
}
);

const Spent = mongoose.model("spent", spentSchema);
module.exports= Spent;