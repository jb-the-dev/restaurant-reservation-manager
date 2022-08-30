const knex = require('../db/connection')

function list(){
    return knex("reservations").select("*")
}

function read(reservation_id){
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .first();
}

function create(reservation){
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then(createdRecords => createdRecords[0])
}

module.exports = {
    list,
    read,
    create
}