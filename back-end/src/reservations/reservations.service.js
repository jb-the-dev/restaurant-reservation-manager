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
        .whereNot({ status: "finished" })
        .whereNot({ status: "cancelled" })
        .orderBy( "reservation_time", 'asc' )
}

function update(updatedReservation) {
    return knex("reservations")
        .where({ reservation_id: updatedReservation.reservation_id })
        .update(updatedReservation)
        .then(() => read(updatedReservation.reservation_id))
}

module.exports = {
    list,
    read,
    create,
    listByDate,
    update
}