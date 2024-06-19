const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const config = require('../config');
const axios = require('axios');
const {nanoid} = require('nanoid');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {username, password, displayName, avatarImage} = req.body;
    const userData = {
      username,
      password,
      displayName,
      avatarImage: avatarImage || null,
    };
    const user = new User(userData);
    
    user.generateToken();
    await user.save();
    
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/facebookRegister', async (req, res) => {
  const inputToken = req.body.accessToken;
  const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;
  
  const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;
  
  try {
    const response = await axios.get(debugTokenUrl);
    
    if (response.data.data.error) {
      return res.status(401).send('Facebook token incorrect!');
    }
    
    if (req.body.id !== response.data.data.user_id) {
      return res.status(401).send('Wrong User ID!');
    }
    
    let user = await User.findOne({username: req.body.id});
    
    if (!user) {
      user = new User({
        username: req.body.id,
        displayName:  req.body.name,
        password: nanoid(),
        avatarImage: req.body.picture.data.url,
      });
    } else {
      return res.status(400).send('This user is already registered!');
    }
    
    user.generateToken();
    
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(401).send('Facebook token incorrect!');
  }
});

router.post('/sessions', async (req, res) => {
  const {username, password} = req.body;
  const user = await User.findOne({username});
  
  if (!user) {
    return res.status(401).send('Username or password is wrong');
  }
  
  const isMatch = await user.checkPassword(password);
  
  if (!isMatch) {
    return res.status(401).send('Username or password is wrong');
  }
  
  try {
    user.generateToken();
    
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/facebookLogin', async (req, res) => {
  const inputToken = req.body.accessToken;
  const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;
  
  const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;
  
  try {
    const response = await axios.get(debugTokenUrl);
    
    if (response.data.data.error) {
      return res.status(401).send('Facebook token incorrect!');
    }
    
    if (req.body.id !== response.data.data.user_id) {
      return res.status(401).send('Wrong User ID!');
    }
    
    let user = await User.findOne({username: req.body.id});
    
    if (!user) {
      return res.status(400).send('This user is not registered!');
    }
    
    user.generateToken();
    
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(401).send('Facebook token incorrect!');
  }
});

router.delete('/sessions', auth, async (req, res) => {
  try {
    const user = req.user;
    user.generateToken();
  
    await user.save();
    return res.send(user);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;