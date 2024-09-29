const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  address: { type: String, require: false },
  email: { type: String, require: true },
  phonenumber: { type: Number, require: true },
});

// Hash the password before saving the user model
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare the entered password with the hashed password
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const User =  mongoose.model('registers', userSchema,'registers');
module.exports ={User}
