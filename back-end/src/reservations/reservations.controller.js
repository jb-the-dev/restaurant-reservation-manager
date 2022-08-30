const service = require("./reservations.service")

//TODO build validation for valid properties
//TODO build specific validator for reservation_date, reservation_time, and people

// VALIDATORS

/**
 * Validator to check if reservation exists
 */
async function reservationExists(req, res, next){
  const reservation = await service.read(req.params.reservation_id)

  if (reservation){
    res.locals.reservation = reservation;
    return next();
  }
  next({ status: 404, message: "Reservation cannot be found."})
}

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
]

/**
 * Validator to check that each reservation contains all the valid properties
 */
async function hasOnlyValidProperties(req, res, next){
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(field => !VALID_PROPERTIES.includes(field))

  if (invalidFields.length) {
    return next({
      status: 400, message: `Invalid field(s): ${invalidFields.join(", ")}`
    });
  }
  next();
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

async function read(req, res) {
  res.json({
    data: res.locals.reservation
  })
}

module.exports = {
  list,
  read: [reservationExists, read]
};
