const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { read } = require("../reservations/reservations.service");
const service = require("./tables.service");

// VALIDATORS
async function tableExists(req, res, next) {
  const table = await service.read(req.params.table_id);

  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `Table ${req.params.table_id} cannot be found.`,
  });
}

const VALID_PROPERTIES = ["table_name", "capacity"];

/**
 * Validator to check that each table contains only valid properties
 */
function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter((field) => {
    !VALID_PROPERTIES.includes(field);
  });

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

/**
 * Validator to check that each table contains all the required properties
 */
function hasRequiredProperties(req, res, next) {
  const { data = {} } = req.body;

  VALID_PROPERTIES.forEach((property) => {
    if (!data[property]) {
      return next({
        status: 400,
        message: `A '${property}' property is required.`,
      });
    }
  });
  next();
}

function isValidTableName(req, res, next) {
  const { data = {} } = req.body;

  if (data.table_name.length > 1) return next();
  next({
    status: 400,
    message: "The table_name is either missing or is only one character.",
  });
}

function isValidCapacity(req, res, next) {
  const { data = {} } = req.body;

  if (typeof data.capacity === "number" && data.capacity > 0) return next();
  next({
    status: 400,
    message: "The capacity must exist and be a number greater than zero.",
  });
}

function hasData(req, res, next) {
  if (req.body.data) return next();
  next({
    status: 400,
    message: "Data is missing",
  });
}

function hasReservationId(req, res, next) {
  const { data = {} } = req.body;

  if (!Object.hasOwn(data, "reservation_id"))
    return next({
      status: 400,
      message: "The reservation_id property is missing.",
    });

  next();
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;

  const reservation = await read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${reservation_id} does not exist.`,
  });
}

async function groupFitsAtTable(req, res, next) {
  const { data = {} } = req.body;
  const { table, reservation } = res.locals;

  const currentReservation = await read(reservation.reservation_id);

  if (currentReservation.people <= table.capacity) return next();
  next({
    status: 400,
    message:
      "This table does not have the capacity to fit everyone in the party.",
  });
}

// NB! this validator is paired with seating tables
function isOccupied(req, res, next) {
  const table = res.locals.table;
  if (table.reservation_id)
    return next({
      status: 400,
      message: "Sorry, this table is currently occupied",
    });
  return next();
}

// NB! this validator is paired with unseating tables
function isNotOccupied(req, res, next) {
  const { table_id } = req.params;
  const table = res.locals.table;

  if (!table.reservation_id)
    return next({
      status: 400,
      message: `Table ${table_id} is not occupied already.`,
    });
  return next();
}

function reservationAlreadySeated(req, res, next) {
  const { status } = res.locals.reservation;

  if (status === "seated") {
    next({
      status: 400,
      message: "This reservation is already seated.",
    });
  }
  next();
}

// HANDLERS
async function listTables(req, res, next) {
  res.json({ data: await service.list() });
}

async function getTable(req, res, next) {
  res.json({ data: res.locals.table });
}

async function create(req, res) {
  let newTable = await service.create(req.body.data);
  res.status(201).json({ data: newTable });
}

async function update(req, res) {
  const { reservation_id } = req.body.data;
  const currentTable = res.locals.table;

  const updatedTable = {
    ...currentTable,
    reservation_id: reservation_id,
  };
  res.json({ data: await service.update(updatedTable) });
}

async function unseat(req, res, next) {
  const { table } = res.locals;

  res.json({ data: await service.unseatReservation(table.reservation_id) });
}

module.exports = {
  list: asyncErrorBoundary(listTables),
  read: [asyncErrorBoundary(tableExists), getTable],
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    isValidTableName,
    isValidCapacity,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(tableExists),
    hasData,
    hasReservationId,
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(groupFitsAtTable),
    isOccupied,
    reservationAlreadySeated,
    asyncErrorBoundary(update),
  ],
  unseat: [
    asyncErrorBoundary(tableExists),
    isNotOccupied,
    asyncErrorBoundary(unseat),
  ],
};
