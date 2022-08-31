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

function listByDate(date){
    return knex("reservations")
        .select("*")
        .where({ reservation_date: date })
        .orderBy( "reservation_time", 'asc' )
}

module.exports = {
    list,
    read,
    create,
    listByDate
}