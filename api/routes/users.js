'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models').User;

const { asyncHandler } = require('../middleware/asyncHandler');
const { authenticateUser } = require('../middleware/authUser');

// Construct a router instance.
const router = express.Router();

// Route that returns a list of users.
router.get('/', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;

  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress,
    password: user.password,
    userId: user.id
  });
  res.status(200);
}));

// Route that creates a new user.
router.post('/users',   asyncHandler(async (req, res) => {
  try {
    await User.create(req.body);
    res.location("/");
   // res.status(201).json({ message: "Account successfully created!" });
   res.status(201).end();
  } catch (error) {
    console.log("ERROR: ", error.name);
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      const errors = error.errors.map((err) => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
})
);

module.exports = router;