const express = require('express');
const { getInvoice , postInvoice } = require('../controllers/invoice.controller');

const routerInvoice = express.Router();

//const { restrictToSelf } = require('../middlewares/auth.middlware');

routerInvoice.get('/getInvoice', getInvoice);
routerInvoice.post('/addInvoice', postInvoice);

module.exports = routerInvoice;
