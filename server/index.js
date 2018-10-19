'use strict'

var port = 3410;
var app = require('./app');
const ngrok = require('ngrok');
(async function() {
  const url = await ngrok.connect();
})();
app.listen(port, () => {
    console.log("Servidor de node, corriendo en el puerto: " + port);

})