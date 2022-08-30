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
      status: 400, 
      message: `Invalid field(s): ${invalidFields.join(", ")}`
    });
  }
  next();
}

/**
 * Specific validator to check reservation_date is a date
 */
// async function isValidDate(req, res, next) {

// }


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
    data: res.locals.reservation
  })
}

async function create(req, res) {
  const newReservation = await service.create(req.body.data)

  res.status(201).json({ data: newReservation })




  // const { data: {first_name, last_name, mobile_number, reservation_date, reservation_time, people} = {} } = req.body;
  // const newReservation = {
  //   first_name,
  //   last_name,
  //   mobile_number,
  //   reservation_date,
  //   reservation_time,
  //   people
  // }
  
}

module.exports = {
  list,
  read: [reservationExists, read],
  create: [hasOnlyValidProperties, create]
};
