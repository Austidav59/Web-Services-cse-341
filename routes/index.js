const routes = require('express').Router();
const lesson1Controller = require("../controllers/lesson1");
const controllerContacts = require("../controllers/contacts")


// ROUTES FOR APP
routes.get("/", lesson1Controller.friends);
routes.get("/mom", lesson1Controller.oldFriends);
routes.get("/contacts", controllerContacts.getAllContacts);
routes.get("/contacts/:id", controllerContacts.getSingleContact);




module.exports = routes;