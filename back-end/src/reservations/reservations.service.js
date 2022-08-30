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

module.exports = {
    list,
    read,
}