const data = require("./00-reservations.json")

exports.seed = function (knex) {
  return knex.raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE");
};

exports.seed = function (knex) {
  return knex("reservations").insert(data)
}
