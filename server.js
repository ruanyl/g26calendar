var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var moment = require('moment');
var db = require('./src/db');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

/**
 * get event by id
 */
app.get('/event/:id', function(req, res) {
  var id = req.params.id;
  db.findEventById(id, function(err, doc) {
    if (err) {
      res.send({
        'status': 'error'
      });
    } else {
      res.send(doc);
    }
  });
});

/**
 *  list events
 */
app.get('/event', function(req, res) {
  db.listEvents(function(err, docs) {
    if (err) {
      res.send({
        'status': 'error'
      });
    } else {
      res.send(docs);
    }
  });
});

/**
 * TODO: data validation needed!
 * TODO: take timezone into cosideration!
 *
 * save an event
 */
app.post('/event', function(req, res) {
  var eventData = {
    title: req.body.title,
    content: req.body.content,
    start: moment(req.body.start, 'YYYY-MM-DD HH:mm'),
    end: moment(req.body.end, 'YYYY-MM-DD HH:mm')
  };
  db.saveEvent(eventData, function(err) {
    if (err) {
      res.send({
        'status': 'error'
      });
    } else {
      res.send({
        'status': 'success'
      });
    }
  });
});

/**
 *  delete an event by id
 */
app.delete('/event/:id', function(req, res) {
  var id = req.params.id;
  db.deleteEventById(id, function(err) {
    if (err) {
      res.send({
        'status': 'error'
      });
    } else {
      res.send({
        'status': 'success'
      });
    }
  });
});

/**
 * update an event by id
 */
app.put('/event/:id', function(req, res) {
  var id = req.params.id;
  var eventData = req.body;
  db.updateEventById(id, eventData, function(err, doc) {
    if (err) {
      res.send({
        'status': 'error'
      });
    } else {
      res.send({
        'status': 'success',
        'doc': doc
      });
    }
  });
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
