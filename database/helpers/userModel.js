const db = require('../dbConfig');

module.exports = { getUsers, add, getUser }

function getUsers() {
  return db('users as u').select('u.id', 'u.username', 'u.password')
};

function getUser(username) {
  return db('users').where(username).first();
};

function add(user) {
  return db('users').insert(user)
};
