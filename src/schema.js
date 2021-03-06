var mongoose = require('mongoose');

var EventSchema = mongoose.Schema({
  googleId: 'String',
  title: 'String',
  content: 'String',
  start: 'Date',
  end: 'Date',
  priority: {type: 'Number', default: 0}
});

module.exports = {
  EventSchema: EventSchema
};
