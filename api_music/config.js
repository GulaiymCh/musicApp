const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  mongo: {
    db: 'mongodb://localhost/music',
    options: {useNewUrlParser: true},
  },
  facebook: {
    appId: '',
    appSecret: process.env.FACEBOOK_APP_SECRET,
  },
};