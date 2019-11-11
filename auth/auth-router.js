const router = require('express').Router();
const bcrypt = require('bcryptjs');

const db = require('../database/helpers/userModel');
const middleware = require('./authenticate-middleware');

router.post('/register', middleware.validateCredentialBody, (req, res) => {
  const credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 14);

  credentials.password = hash;
  db.add(credentials)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json(err))
});

router.post('/login', middleware.validateCredentialBody, (req, res) => {
  const { username, password } = req.body;

  db.getUser({ username })
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = middleware.generateToken(user);

      req.session.user = user;
      res.status(201).json({
         message: `Logged in, welcome ${user.username}!`,
         token,
      })
    } else res.status(401).json({ error: `Invalid credentials.` })
  })
  .catch(err => res.status(500).json(err))
});

module.exports = router;
