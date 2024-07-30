const mongoose = require('mongoose')
const schema = mongoose.Schema

const invoiceSchema = new schema({
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
    default: ""
  },
},
{
    collection: "invoice",
})

const Invoice = mongoose.model('invoice', invoiceSchema);
module.exports = Invoice;
