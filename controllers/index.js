var express = require('express');
var router = express.Router();

router.get('/', function(request, response){
  response.status(200).send('Hello world!');
});

module.exports = router;
