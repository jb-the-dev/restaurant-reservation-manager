const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function create(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function update(updatedTable) {
  return knex.transaction(function (trx) {
    return trx("tables")
      .where({ table_id: updatedTable.table_id })
      .update(updatedTable)
      .returning("*")
      .then((updatedRecords) => updatedRecords[0])
      .then((tableRecord) => {
        return trx("reservations")
          .where({ reservation_id: tableRecord.reservation_id })
          .update({ status: "seated" })
          .returning("*")
          .then((updatedReservations) => updatedReservations[0]);
      });
  });
}

function unseatReservation(reservation_id) {
  return knex.transaction(function (trx) {
    return trx("tables")
      .where({ reservation_id })
      .update({ reservation_id: null })
      .then(() => {
        return trx("reservations")
          .where({ reservation_id })
          .update({ status: "finished" });
      });
  });
}

module.exports = {
  list,
  read,
  create,
  update,
  unseatReservation,
};
