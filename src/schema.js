var mongoose = require('mongoose');

var EventSchema = mongoose.Schema({
  title: 'String',
  content: 'String',
  start: 'Date',
  end: 'Date'
});

module.exports = {
  EventSchema: EventSchema
};
