const Connectdb = require("../modules/connect");

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Connectdb.contacts();
        res.json(contacts);
    } catch (error) {
        console.error("Error fetching all contacts:", error);
        res.status(500).json({ error: "Error fetching contacts" });
    }
};

const getSingleContact = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: "ID parameter is required" });
        }

        const contact = await Connectdb.singleContact(id);
        res.json(contact);
    } catch (error) {
        console.error("Error in getSingleContact:", error);
        if (error.message === 'Invalid contact ID' || error.message === 'Contact not found') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Error fetching contact" });
        }
    }
};

const addContact = async (req, res) => {
    try {
        const { first_name, last_name, email, birthday, color} = req.body; // Assuming these fields are necessary

        // Simple validation
        if (!first_name || !last_name || !email || !birthday || !color) {
            return res.status(400).json({ error: "Name, email, are required." });
        }

        // Add the contact to the database
        const newContact = await Connectdb.addContact({ first_name, last_name, email, birthday, color});

        // Respond with the newly created contact
        res.status(201).json(newContact);
    } catch (error) {
        console.error("Error adding contact:", error);
        res.status(500).json({ error: "Error adding contact" });
    }
};

module.exports = {
    getAllContacts,
    getSingleContact,
    addContact
};