var mongoose              = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// User Schema
var userSchema = new mongoose.Schema({
  username: {
    type: String,
    index:true  // Index ensures property is unique in db.
  },
  hash: {
    type: String
  },
  email: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
      type: String
  },
  roles: {
    type: Array
  },

});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);
module.exports = User;
