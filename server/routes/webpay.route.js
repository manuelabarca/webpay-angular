'use strict'

var express = require('express');
var WebPayController = require("../controllers/webpay.controller");
var api = express.Router();

api.post('/pagar',WebPayController.pagar);
api.post('/verificar', WebPayController.verificar);
api.post('/comprobante', WebPayController.comprobante);

module.exports = api;