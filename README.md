#Example App

This example web app demonstrates a nosql-injection vulnerability. It documents the steps necessary to create the basic app, shows the vulnerability, and then shows some ways to potentially fix it.

The following technologies and versions are used:

* Node.js v0.10.40
* Express v4.13.3
* mongodb v3.0.6

This tutorial assumes Mac OS X (v10.10.5) as the development machine.

###Install Node

My favorite method for installing node is [nvm (node version manager)](https://github.com/creationix/nvm)

Open a terminal (/Applications/Utilities/Terminal) and run the curl installer from the nvm page.

You can now list the versions of node that are available to you.

`~]$ nvm ls-remote`

To install the latest version of v0.10 execute the following.

`~]$ nvm install v0.10`




###Setup the Project

Open a terminal (/Applications/Utilities/Terminal) and create a project directory.

`]$ mkdir ~/Desktop/example-app`

and then move into that directory.

`]$ cd ~/Desktop/example-app`

then, create a ***package.json*** file using the ___npm init___ command

`]$ npm init`

Hit enter to accept the default name, version, and description.

1. For the entry point, enter ***server.js***
2. For the test command, enter ***mocha test/index.js***

Hit enter to accept the remaining default values.

###Install Test Dependencies

Because we said we would use mocha as our test harness for the test command, we should install mocha.

`]$ npm install mocha -g`

The `-g` tells npm to install mocha globally.

We will be using the ***supertest*** module in order to perform basic unit tests against our example app.

`]$npm install supertest --save-dev`

Next we need to create the test harness we specified when we ran `npm init`.

`]$ mkdir test && touch test/index.js`

Great!  Now let's write our first test!

```
var app = require('../server.js');
var request = require('supertest');

describe('GET /', function(){
  it('should return a 200', function(done){
    request(app)
      .get('/')
      .expect(200, done);
  });
});
```
If we now run `]$ npm test`, the command should fail with a stack trace indicating ***server.js*** can't be found. It can't be found because we haven't created it yet.  So let's do that.

###Scaffolding the App

We're going to be using express, so let's install the module using npm.

`]$ npm install express --save`

Next let's create our ***server.js*** file.

`]$ touch server.js`

Then add the basic express scaffolding for an express4 app.

```
var express = require('express');
var app = express();

app.set('port', process.env.port || 3000);

var server = app.listen(app.get('port'), function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening on http://%s:%s', host, port);
});

module.exports = app;
```
Now if we run our test, we see that we have a failing test, but the error has changed.

###Basic Routing

We clearly have more work to do. Let's create an express route in order to respond when someone accesses the default directory. Go back to the terminal at our example-app and type the following:

`]$ mkdir controllers && touch controllers/index.js`

Now open the ***./controllers/index.js*** file in the editor of your choice.

```
var express = require('express');
var router = express.Router();

router.get('/', function(request, response){
  response.status(200).send('Hello world!');
});

module.exports = router;
```

Finally, import the file in your ***server.js***

```
app.set('port', process.env.port || 3000); 
app.use(require('./controllers')); //add this after your port declaration
```




