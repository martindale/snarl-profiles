var config = require('./config');

var Maki = require('maki');
var maki = new Maki(config);

var People = maki.define('People', {
  attributes: {
    username: { type: String },
    bio: { type: String }
  }
});

maki.start();

module.exports = {
  bio: function(data, cb) {
    console.log('incoming data:', data);
    People.get({ username: data.from.username }, function(err, person) {
      if (err) return console.error(err);

      if (!person) {
        People.create({
          username: data.from.username
        }, function(err, person) {
          if (err) console.error(err);
          return cb(err, 'Okay...' + JSON.stringify(person));
        });
      } else {
        return cb(err, 'Okay...' + JSON.stringify(person));
      }
    });
  },
};
