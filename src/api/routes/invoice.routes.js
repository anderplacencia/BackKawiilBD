const express = require('express');
const { postInvoice, getInvoiceById , updateInvoiceById , deleteInvoiceById} = require('../controllers/invoice.controller');
const upload = require("../middleware/upload.file")//importa el multer

const routerInvoice = express.Router();

routerInvoice.post('/addInvoice', upload.single("file"), postInvoice); //upload.single gestiona validación del archivo
routerInvoice.get('/getInvoice/:id', getInvoiceById);
routerInvoice.put('/updateInvoice/:id', updateInvoiceById);
routerInvoice.delete('/deleteInvoice/:id', deleteInvoiceById);

module.exports = routerInvoice;
