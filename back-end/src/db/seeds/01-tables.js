const data = require("./01-tables.json")

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tables').del()
    .then(() => knex('tables').insert(data)
    );
};
