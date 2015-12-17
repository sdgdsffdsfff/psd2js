// Generated by CoffeeScript 1.7.1
(function() {
  var RSVP, fs;

  fs = require('fs');

  RSVP = require('rsvp');

  module.exports = {
    extended: function(PSD) {
      this.fromFile = function(file) {
        return new PSD(fs.readFileSync(file));
      };
      return this.open = function(file) {
        return new RSVP.Promise(function(resolve, reject) {
          return fs.readFile(file, (function(_this) {
            return function(err, data) {
              var psd;
              if (err) {
                return reject(err);
              }
              psd = new PSD(data);
              psd.parse();
              return resolve(psd);
            };
          })(this));
        });
      };
    }
  };

}).call(this);