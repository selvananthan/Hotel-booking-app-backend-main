const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// const secret = 'your_jwt_secret';  // Replace with your actual JWT secret

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
      const dbResponse = await User.findOne({
          username,
          password,
      });
      console.log(dbResponse, "dbResponse");
      if (dbResponse._id) {
          res.send(username);
      }
  } catch (error) {
      console.log(error);
      res.send("error");
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
