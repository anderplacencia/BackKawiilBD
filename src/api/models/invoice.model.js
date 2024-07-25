const mongoose = require('mongoose')
const schema = mongoose.Schema

const invoiceSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },//se relaciona con la coleccion user(usuario que )
  company: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  file: {
    type: String,
    required: true
  }
},
{
    collection: "invoice",
})

const Invoice = mongoose.model('invoice', invoiceSchema);
module.exports = Invoice;
