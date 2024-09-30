const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');


// const secret = 'your_jwt_secret';  // Replace with your actual JWT secret
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
      const dbResponse = await User.findOne({ username });
      if (!dbResponse) {
          return res.status(400).send('User not found');
      }
      
      const isMatch = await bcrypt.compare(password, dbResponse.password); // Compare hashed password
      if (!isMatch) {
          return res.status(400).send('Invalid password');
      }
      console.log(dbResponse);
      
      res.send(dbResponse);
  } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
  }
});


router.post('/register', async (req, res) => {
  console.log("register entered");
  
  const { username, password, address, phonenumber, email } = req.body;
  try {
      const dbResponse = await User.create({
          username,
          password,
          address,
          phonenumber,
          email,
      });
      console.log(dbResponse, "dbResponse");
      if (dbResponse._id) {
          res.send(username);
      }
  } catch (error) {
      console.log(error);
      res.send(error);
  }
});

module.exports = router;
