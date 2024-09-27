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

module.exports = {
    getAllContacts,
    getSingleContact
};