const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");
const { DateTime } = require("luxon");

// VALIDATORS

/**
 * Validator to check if reservation exists
 */
async function reservationExists(req, res, next) {
  const reservation = await service.read(req.params.reservation_id);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${req.params.reservation_id} cannot be found.`,
  });
}

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

/**
 * Validator to check that each reservation contains only valid properties
 */
async function hasOnlyValidProperties(req, res, next) {
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
 * Validator to check that each reservation contains all the required properties
 */
async function hasRequiredProperties(req, res, next) {
  const { data = {} } = req.body;

  VALID_PROPERTIES.forEach((property) => {
    // console.log("property", property)
    if (!data[property]) {
      return next({
        status: 400,
        message: `A '${property}' property is required.`,
      });
    }
  });
  next();
}

/**
 * Specific validator to check reservation_date is a date
 */
async function isValidDate(req, res, next) {
  const { data = {} } = req.body;
  let dateResult = DateTime.fromISO(data["reservation_date"]);

  if (!dateResult.isValid) {
    return next({
      status: 400,
      message: `The date inputted is not valid reservation_date.`,
    });
  }
  next();
}

/**
 * Specific validator to check reservation_time is a time
 */
async function isValidTime(req, res, next) {
  const { data = {} } = req.body;
  let timeResult = DateTime.fromISO(data["reservation_time"]);

  if (!timeResult.isValid) {
    return next({
      status: 400,
      message: `The time inputted is not a valid reservation_time.`,
    });
  }
  next();
}

/**
 * Specific validator to check reservation_time is a time
 */
 async function isValidPeopleProp(req, res, next) {
  const { data = {} } = req.body;

  if ( typeof data["people"] !== "number" ) {
    return next({
      status: 400,
      message: "Data in 'people' must be a number."
    })
  }
  next();
 }

// HANDLERS

/**
 * List handler for reservation resources
 */
async function list(req, res, next) {
  if (req.query) return next();
  res.json({
    data: await service.list(),
  });
}

function read(req, res) {
  res.json({
    data: res.locals.reservation,
  });
}

async function create(req, res) {
  let newReservation = await service.create(req.body.data);
  res.status(201).json({ data: newReservation});
}

async function listByDate(req, res, next) {
  let date = req.query.date
  res.json({ data: await service.listByDate(date) })
}

module.exports = {
  list:  asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), read],
  create: [
    asyncErrorBoundary(hasOnlyValidProperties),
    asyncErrorBoundary(hasRequiredProperties),
    asyncErrorBoundary(isValidDate),
    asyncErrorBoundary(isValidTime),
    asyncErrorBoundary(isValidPeopleProp),
    asyncErrorBoundary(create),
  ],
  listByDate: asyncErrorBoundary(listByDate),
};
