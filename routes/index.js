const routes = require('express').Router();
const lesson1Controller = require("../controllers/lesson1");
const controllerContacts = require("../controllers/contacts");

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get friends
 *     description: Retrieve a list of friends
 *     tags: [Friends]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 */
routes.get("/", lesson1Controller.friends);

/**
 * @swagger
 * /mom:
 *   get:
 *     summary: Get old friends
 *     description: Retrieve a list of old friends
 *     tags: [Friends]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 */
routes.get("/mom", lesson1Controller.oldFriends);

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Retrieve a list of all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Internal server error
 */
routes.get("/contacts", controllerContacts.getAllContacts);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a single contact
 *     description: Retrieve details of a specific contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */
routes.get("/contacts/:id", controllerContacts.getSingleContact);

/**
 * @swagger
 * /addcontact:
 *   post:
 *     summary: Add a new contact
 *     description: Create a new contact entry
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewContact'
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
routes.post("/addcontact", controllerContacts.addContact);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     description: Update details of a specific contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewContact'
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */
routes.put("/contacts/:id", controllerContacts.updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     description: Delete a specific contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     responses:
 *       204:
 *         description: Contact deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */
routes.delete("/contacts/:id", controllerContacts.deleteContact);

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         birthday:
 *           type: string
 *           format: date
 *         color:
 *           type: string
 *     NewContact:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *       properties:
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         birthday:
 *           type: string
 *           format: date
 *         color:
 *           type: string
 */

module.exports = routes;