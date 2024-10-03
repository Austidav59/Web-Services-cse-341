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
        console.log("Request Body:", req.body); // Debugging log
        const { first_name, last_name, email, birthday, color } = req.body;

        // Simple validation
        if (!first_name || !last_name || !email || !birthday || !color) {
            return res.status(400).json({ error: "First name, last name, email, birthday, and color are required." });
        }

        // Add the contact to the database and get the new contact object (including the ID)
        const newContact = await Connectdb.addContact({ first_name, last_name, email, birthday, color });

        // Send a response that includes the ID of the newly added contact
        res.status(201).json({
            message: "Contact added successfully",
            contactId: newContact._id
        });
    } catch (error) {
        console.error("Error adding contact:", error);
        res.status(500).json({ error: "Error adding contact" });
    }
};

const updateContact = async (req, res) => {
    try {
        const id = req.params.id; // Get the ID from the URL parameter
        const { first_name, last_name, email, birthday, color } = req.body; // Get the new contact data from the request body

        // Log the ID and body for debugging
        console.log("ID to update:", id);
        console.log("Data to update:", { first_name, last_name, email, birthday, color });

        // Simple validation to check for required fields
        if (!first_name || !last_name || !email || !birthday || !color) {
            return res.status(400).json({ error: "First name, last name, email, birthday, and color are required." });
        }

        // Check if the contact exists
        const existingContact = await Connectdb.singleContact(id);
        if (!existingContact) {
            console.log("Contact not found for ID:", id); // Log the ID that couldn't be found
            return res.status(404).json({ error: "Contact not found" });
        }

        // Update the contact in the database
        const updatedContact = await Connectdb.updateContact(id, {
            first_name, last_name, email, birthday, color
        });

        // If no contact is found or updated
        if (!updatedContact) {
            console.log("Update failed for ID:", id); // Log the failure
            return res.status(404).json({ error: "Contact not found or update failed" });
        }

        // Send a 200 OK response with the updated contact information
        res.status(200).json({ message: "Contact updated successfully", updatedContact });
    } catch (error) {
        console.error("Error updating contact:", error);
        res.status(500).json({ error: "Error updating contact" });
    }
};

module.exports = {
    getAllContacts,
    getSingleContact,
    addContact,
    updateContact
};
