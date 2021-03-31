var express = require('express');
var  app = express();
var  port = process.env.PORT || 8080;
var routes = require('./api/routes/f1Routes');


app.use('/api/v1', routes);


app.listen(port);


console.log('API server started on: ' + port);