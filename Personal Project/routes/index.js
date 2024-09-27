const routes = require('express').Router();
const lesson1Controller = require("../controllers/lesson1");
const controllerContacts = require("../controllers/contacts")


// ROUTES FOR APP
routes.get("/", lesson1Controller.friends);
routes.get("/mom", lesson1Controller.oldFriends);
routes.get("/contacts", controllerContacts.contacts);
routes.get("/contacts", controllerContacts.single);




module.exports = routes;