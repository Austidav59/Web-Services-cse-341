const routes = require('express').Router();
const lesson1Controller = require("../controllers/lesson1");
const controllerContacts = require("../controllers/contacts");

// ROUTES FOR APP
routes.get("/", lesson1Controller.friends);
routes.get("/mom", lesson1Controller.oldFriends);
routes.get("/contacts", controllerContacts.getAllContacts);
routes.get("/contacts/:id", controllerContacts.getSingleContact);
routes.post("/addcontact", controllerContacts.addContact); // Use POST for adding a contact
routes.put("/contacts/:id", controllerContacts.updateContact);


module.exports = routes;
