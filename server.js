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
 *
 * save an event
 */
app.post('/event', function(req, res) {
  var eventData = {
    title: req.body.title,
    content: req.body.content,
    start: moment.utc(req.body.start, 'YYYY-MM-DD HH:mm'),
    end: moment.utc(req.body.end, 'YYYY-MM-DD HH:mm'),
    priority: req.body.priority
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
      res.send(doc);
    }
  });
});

app.get('/event/w/:day', function(req, res) {
  var day = req.params.day;
  db.findEventsDayofWeek(day, function(err, docs) {
    if (err) {
      res.send({
        'status': 'error'
      });
    } else {
      res.send(docs);
    }
  });
});

app.post('/event/search', function(req, res) {
  var query = req.body;
  db.findEvents(query, function(err, docs) {
    if (err) {
      res.send({
        'status': 'error'
      });
    } else {
      res.send(docs);
    }
  });
});

var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
