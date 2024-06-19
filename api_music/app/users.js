const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {username, password} = req.body;
    const userData = {username, password};
    const user = new User(userData);
    
    user.generateToken();
    await user.save();
    
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
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
    return res.status(401).send({error: 'Username or password is wrong'});
  }
  
  try {
    user.generateToken();
    
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send({error: e.errors});
  }
});

module.exports = router;