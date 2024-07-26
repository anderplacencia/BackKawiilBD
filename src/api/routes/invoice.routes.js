const express = require('express');
const { postInvoice, getInvoiceById , updateInvoiceById , deleteInvoiceById} = require('../controllers/invoice.controller');

const routerInvoice = express.Router();

routerInvoice.post('/addInvoice', postInvoice);
routerInvoice.get('/getInvoice/:id', getInvoiceById);
routerInvoice.put('/updateInvoice/:id', updateInvoiceById);
routerInvoice.delete('/deleteInvoice/:id', deleteInvoiceById);

module.exports = routerInvoice;
