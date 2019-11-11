const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const sessionConfig = {
  name: 'userID', // sid
  secret: 'useID credential data.',
  cookie: {
    maxAge: 1000 * 60,
    secure: false, // true in production
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,
}

const server = express();
server.use(session(sessionConfig))
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate.restricted, jokesRouter);

module.exports = server;
