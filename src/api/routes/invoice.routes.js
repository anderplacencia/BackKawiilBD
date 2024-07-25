const express = require('express');
const { postInvoice, getInvoiceById , updateInvoiceById , deleteInvoiceById} = require('../controllers/invoice.controller');

const router = express.Router();

router.post('/addInvoice', postInvoice);
router.get('/getInvoice/:id', getInvoiceById);
router.put('/updateInvoice/:id', updateInvoiceById);
router.delete('/deleteInvoice/:id', deleteInvoiceById);

module.exports = router;
