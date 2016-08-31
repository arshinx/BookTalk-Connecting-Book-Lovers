// User Model

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },

  name: {
    type: String,
    required: true,
    trim: true
  },

  favoriteBook: {
    type: String,
    required: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  }
});

// Authentication - Login
UserSchema.statistics.authenticate = function(email, password, callback) {
  User.findOne({ email: email });
};


// pre save method for hashing password
UserSchema.pre('save', function(next) {
  var user = this;

  // user = document, password = field in document
  bcrypt.hash(user.password, 10, function(err, hash) {

    if (err) {
      return next(err);
    }

    user.password = hash;
    next();
  });
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
