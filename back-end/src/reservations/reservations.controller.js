const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

//TODO build validation for valid properties
//TODO build specific validator for reservation_date, reservation_time, and people

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
  let date = data["reservation_date"]

  let result = Date.parse(date)
  console.log("date", data["reservation_date"], "time", data["reservation_time"], "people", data["people"])
  console.log("result", result)
}

// HANDLERS

/**
 * List handler for reservation resources
 */
async function list(req, res) {
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
  await service.create(req.body.data);
  res.sendStatus(201);
}

module.exports = {
  list,
  read: [asyncErrorBoundary(reservationExists), read],
  create: [
    asyncErrorBoundary(hasOnlyValidProperties),
    asyncErrorBoundary(hasRequiredProperties),
    asyncErrorBoundary(isValidDate),
    asyncErrorBoundary(create),
  ],
};
