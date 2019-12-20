const knex = require("../database/dbConfig");

const usersDB = require("../api/dbHelpers/Users");

module.exports = {
  get: usersDB.get,
  insert: usersDB.insert,
  getByUsername,
};

function getByUsername(username) {
  return knex
    .select("*")
    .from("users")
    .where({ username });
}
