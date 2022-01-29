var express = require('express');
var nats = require('nats');

var servicePort = process.env.PORT || 8080;
var natsUrl = process.env.NATS || "nats://localhost:4222";
var natsUser = process.env.NATSUSER || "user";
var natsPass = process.env.NATSPASS || "pass";
var topic = (process.env.TOPIC || 'test');

var clientID = 0;
var clients = {};

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/events/', function(req, res) {
  res.writeHead(200, {
    'content-type': 'text/event-stream',
    'cache-control': 'no-cache',
    'connection': 'keep-alive'
  });

  res.write('\n');
  (function(clientID) {
    clients[clientID] = res;
    req.on('close', function() {
      console.log('client ' + clientID + ' disconnected');
      delete clients[clientID];
    });
  })(clientID);
  clientID += 1;
});

var nc = nats.connect({
  'url': natsUrl
  , 'user': natsUser
  , 'pass': natsPass
  , 'json': true
});

nc.on('connect', function() {
  console.log('connected');
  nc.subscribe(topic, function(msg) {
    console.log(msg);
    for (var c in clients) {
      clients[c].write(
        `event: ${msg.Event}\ndata:${JSON.stringify(msg.Payload)}\n\n`
      );
    }
  });
});

nc.on('error', function(error) {
  console.log('error', error);
});

app.listen(process.env.PORT || 8080);
