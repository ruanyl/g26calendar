var moment = require('moment');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mcc26');
var Schema = require('./schema');

function saveEvent(data, callback) {
  var EventModel = mongoose.model('event', Schema.EventSchema);
  var event = new EventModel(data);
  event.save(function(err, doc) {
    callback(err, doc);
  });
}

function listEvents(callback) {
  var EventModel = mongoose.model('event', Schema.EventSchema);
  EventModel.find({}, function(err, docs) {
    callback(err, docs);
  });
}

function findEventById(id, callback) {
  var EventModel = mongoose.model('event', Schema.EventSchema);
  EventModel.find({
    '_id': id
  }, function(err, doc) {
    callback(err, doc);
  });
}

function deleteEventById(id, callback) {
  var EventModel = mongoose.model('event', Schema.EventSchema);
  EventModel
    .remove({
      '_id': id
    }, function(err) {
      callback(err);
    });
}

function updateEventById(id, data, callback) {
  var EventModel = mongoose.model('event', Schema.EventSchema);
  EventModel.findOneAndUpdate({
    '_id': id
  }, data, function(err, doc) {
    callback(err, doc);
  });
}

// need to consider timezone
function findEventsDayofWeek(dayOfWeek, callback) {
  var EventModel = mongoose.model('event', Schema.EventSchema);
  var day = moment.utc().day(dayOfWeek);
  EventModel.find({
    'start': {
      '$gt': new Date(day.startOf('day')),
      '$lt': new Date(day.endOf('day'))
    },
    'end': {
      '$gt': new Date(day.startOf('day')),
      '$lt': new Date(day.endOf('day'))
    }
  }, function(err, docs) {
    callback(err, docs);
  });
}

// find events of the coming 3 days
function findEvents3Days(callback) {
  var EventModel = mongoose.model('event', Schema.EventSchema);
  EventModel.find({
    'start': {
      '$lt': new Date(moment.utc().startOf('day').add(3, 'days')),
      '$gt': new Date(moment.utc().startOf('day'))
    }
  }, function(err, docs) {
    callback(err, docs);
  });
}

// find events of this month
function findEventsMonth(callback) {
  var EventModel = mongoose.model('event', Schema.EventSchema);
  EventModel.find({
    'start': {
      '$lt': new Date(moment.utc().endOf('month')),
      '$gt': new Date(moment.utc().startOf('month'))
    }
  }, function(err, docs) {
    callback(err, docs);
  });
}

function findEvents(query, callback) {
  var EventModel = mongoose.model('event', Schema.EventSchema);
  EventModel.find(query, function(err, docs) {
    callback(err, docs);
  });
}

function syncFromGoogle(data, callback) {
  var EventModel = mongoose.model('event', Schema.EventSchema);
  console.log(data);
  EventModel.update({
    googleId: data.googleId
  },
  data, {
    upsert: true
  }, function(err, doc) {
    callback(err, doc);
  });
}

module.exports = {
  saveEvent: saveEvent,
  listEvents: listEvents,
  findEventById: findEventById,
  deleteEventById: deleteEventById,
  updateEventById: updateEventById,
  findEventsDayofWeek: findEventsDayofWeek,
  findEvents: findEvents,
  findEvents3Days: findEvents3Days,
  findEventsMonth: findEventsMonth,
  syncFromGoogle: syncFromGoogle
};
