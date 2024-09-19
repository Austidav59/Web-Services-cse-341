const routes = require('express').Router();
const lesson1Controller = require("../controllers/lesson1");

// ROUTES FOR APP
routes.get("/", lesson1Controller.friends);
routes.get("/mom", lesson1Controller.oldFriends);



module.exports = routes;