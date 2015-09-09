var express = require('express');
var router = express.Router();

router.post('/login', function(request, response){
  response.status(201).send('Hello World');
});

module.exports = router;
