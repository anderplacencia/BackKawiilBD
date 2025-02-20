//importando dependencias de mongoose
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  userInvoices: [{
    type:  schema.ObjectId,
    ref: 'invoice',
    required: false
  }],//se relaciona con la coleccion invoice(facturas)
},
{
    collection: "user",
}
);

const User = mongoose.model("user", userSchema);
module.exports= User;