const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const service = require("./tables.service")


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

  const VALID_PROPERTIES = [
    "table_name",
    "capacity",
  ];
  
  /**
   * Validator to check that each table contains only valid properties
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
   * Validator to check that each table contains all the required properties
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
  

  async function isValidTableName(req, res, next){
    const { data = {} } = req.body;

    if (data.table_name.length > 1) return next()
    next({
        status: 400,
        message: "The table_name is either missing or is only one character."
    })
  }

  async function isValidCapacity(req, res, next) {
    const { data = {} } = req.body;

    if (typeof data.capacity === "number" && data.capacity > 0 ) return next()
    next({
        status: 400,
        message: "The capacity must exist and be a number greater than zero."
    })
  }

// HANDLERS
async function listTables(req, res, next){
    res.json({ data: await service.list() })
}

async function getTable(req, res, next) {
    res.json({ data: res.locals.table })
}

async function create(req, res) {
    let newTable = await service.create(req.body.data)
    res.status(201).json({ data: newTable})
}


module.exports = {
    list: asyncErrorBoundary(listTables),
    read: [
        asyncErrorBoundary(tableExists),
        getTable],
    create: [
        asyncErrorBoundary(hasOnlyValidProperties),
        asyncErrorBoundary(hasRequiredProperties),
        asyncErrorBoundary(isValidTableName),
        asyncErrorBoundary(isValidCapacity),
        asyncErrorBoundary(create)
    ]
}