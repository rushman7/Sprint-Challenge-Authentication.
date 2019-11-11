const jwt = require('jsonwebtoken');

module.exports = { 
  validateCredentialBody, 
  restricted,
  generateToken
};

function validateCredentialBody(req, res, next) {
  const { username, password } = req.body;

  if (!req.body) res.status(400).json({ message: "Missing multiple BODY inputs." })
  else if (!username || !password) res.status(400).json({ message: "Missing username or password." })
  else next();
}

function restricted(req, res, next) {
  if (req.session && req.session.user) next();
  else res.status(401).json({ message: 'You shall not pass!' })
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const secret = 'qwdqwldq9u129dj1l2du1o2d12';
  const options = {
    expiresIn: '8h',
  };

  return jwt.sign(payload, secret, options)
}