const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const {nanoid} = require('nanoid');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const validateEmail = value => {
  const pattern = /^\w+(\.?\w+)*@\w+(\.?\w+)*(\.\w{2,3})+$/;
  if (!pattern.test(value)) return false;
};

const validateDisplayName = value => {
  const pattern = /^[\w\d]+.*[\w\d]+$/;
  if (!pattern.test(value)) return false;
};

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      {validator: validateEmail, message: 'Email is not valid!'},
    ]
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin'],
  },
  displayName: {
    type: String,
    required: true,
    validate: [
      {validator: validateDisplayName, message: 'Name is not valid!'},
    ]
  },
  avatarImage:  String,
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next;
  
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);
  
  this.password = hash;
  next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  }
});

UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function() {
  this.token = nanoid();
};

UserSchema.plugin(uniqueValidator, {message: 'This user is already registered'});

const User = mongoose.model('User', UserSchema);
module.exports = User;