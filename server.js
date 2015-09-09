var express = require('express');
var app = express();

app.set('port', process.env.port || 3000);
app.use(require('./controllers'));

var server = app.listen(app.get('port'), function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening on http://%s:%s', host, port);
});

module.exports = app;
