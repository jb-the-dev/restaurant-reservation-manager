const knex = require("../db/connection")

function list() {
    return knex("tables").select("*")
}

function read(table_id) {
    return knex("tables")
        .select("*")
        .where({ table_id })
        .first();
}

function create(newTable) {
    return knex("tables")
        .insert(newTable)
        .returning("*")
        .then(createdRecords => createdRecords[0])
}

module.exports = {
    list,
    read,
    create
}