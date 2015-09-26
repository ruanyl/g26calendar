var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/event/:id', function (req, res) {
  var id = req.params.id;
  res.send('Find event id: ' + id);
});

app.post('/event', function(req, res) {
  var eventData = req.body;
  res.send('Saved event: ' + JSON.stringify(eventData));
});

app.delete('/event/:id', function(req, res) {
  var id = req.params.id;
  res.send('Delete event id: ' + id);
});

app.put('/event/:id', function(req, res) {
  var id = req.params.id;
  var eventData = req.body;
  res.send('Update event id: ' + id + ' with ' + JSON.stringify(eventData));
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
