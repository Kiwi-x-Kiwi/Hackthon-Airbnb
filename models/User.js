const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  username: String,
  password: String,
  image: String,

  // isAdmin: Boolean,
  // googleID: String,
})

const User = mongoose.model('User', userSchema);

module.exports = User;