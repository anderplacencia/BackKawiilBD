const express = require('express');
const { postInvoice } = require('../controllers/invoice.controller');

const routerInvoice = express.Router();

routerInvoice.post('/addInvoice', postInvoice);

module.exports = routerInvoice;
