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
async function isValidDateFormat(req, res, next) {
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
 * Specific validator to check reservation_date is a date in the future.
 */
async function isFutureDate(req, res, next) {
  const { data = {} } = req.body;

  const date = DateTime.fromISO(`${data.reservation_date}T${data.reservation_time}`)
  // const date = new Date(data.reservation_date.replaceAll("-", "/"));

  if (date < DateTime.now()) {
    return next({
      status: 400,
      message: `Please make sure to pick a date in the future.`,
    });
  }
  next();
}

/**
 * Specific validator to check reservation_date does not fall on a Tuesday
 */
async function isNotTuesday(req, res, next) {
  const { data = {} } = req.body;
  const date = new Date(data.reservation_date.replaceAll("-", "/"));

  if (date.getDay() === 2) {
    return next({
      status: 400,
      message: `The restaurant is closed on Tuesdays.`,
    });
  }
  next();
}

async function isTooEarly(req, res, next) {
  const { data = {} } = req.body;
  const time = DateTime.fromISO(data.reservation_time)
  const openingTime = DateTime.fromISO("10:30");
  
  if (time < openingTime) {
    return next({
      status: 400,
      message: `Reservation time of ${data.reservation_time} is too early.`
    })
  }
  next();
}

async function isTooLate(req, res, next) {
  const { data = {} } = req.body;
  const time = DateTime.fromISO(data.reservation_time)

  const kitchenClosingTime = DateTime.fromISO("21:30");
  
  if (time > kitchenClosingTime) {
    return next({
      status: 400,
      message: `Reservation time of ${data.reservation_time} is too late.`
    })
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

  if (typeof data["people"] !== "number") {
    return next({
      status: 400,
      message: "Data in 'people' must be a number.",
    });
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
  console.log("HELLO", res.locals.reservation)
  res.json({
    data: res.locals.reservation,
  });
}

async function create(req, res) {
  let newReservation = await service.create(req.body.data);

  res.status(201).json({ data: newReservation });
}

async function listByDate(req, res, next) {
  let date = req.query.date;
  res.json({ data: await service.listByDate(date) });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), read],
  create: [
    asyncErrorBoundary(hasOnlyValidProperties),
    asyncErrorBoundary(hasRequiredProperties),
    asyncErrorBoundary(isValidDateFormat),
    asyncErrorBoundary(isValidTime),
    asyncErrorBoundary(isValidPeopleProp),
    asyncErrorBoundary(isFutureDate),
    asyncErrorBoundary(isNotTuesday),
    asyncErrorBoundary(isTooEarly),
    asyncErrorBoundary(isTooLate),
    asyncErrorBoundary(create),
  ],
  listByDate: asyncErrorBoundary(listByDate),
};
