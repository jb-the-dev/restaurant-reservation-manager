/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

//TODO add methodNotAllowed
//TODO return only reservations matching date query param

const router = require("express").Router();
const controller = require("./reservations.controller");

router.route("/").get(controller.list);

router.route("/:reservation_id")
    .get(controller.read)

module.exports = router;
