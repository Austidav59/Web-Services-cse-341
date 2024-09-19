const routes = require('express').Router();
const lesson1Controller = require("../controllers/lesson1");

// ROUTES FOR APP
routes.get("/", lesson1Controller.friends);


console.log(1)

module.exports = routes;