const User = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports = (router) => {
  router.post('/users', async (req, res) => {
    const user = new User({
      password: req.body.password,
      email: req.body.email,
    });

    if (!req.body.email || !req.body.password) {
      res.json({
        success: false,
        message: 'Please enter an email and password.',
      });
    } else {
      await user.save((err) => {
        if (err) {
          res
            .status(409)
            .send({ success: false, message: 'Email already exists.' });
        } else {
          res.status(201).send({ success: true, message: 'User created!' });
        }
      });
    }
  });

  return router;
};
