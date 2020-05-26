'use strict'

var port = 3410;
var app = require('./app');
app.listen(port, () => {
    console.log("Servidor de node, corriendo en el puerto: " + port);

})