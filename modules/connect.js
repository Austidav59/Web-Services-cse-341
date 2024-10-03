require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

const client = new MongoClient(process.env.uri);

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (e) {
        console.error("Could not connect to MongoDB", e);
        throw e;
    }
}

async function contacts() {
    try {
        if (!client.topology || !client.topology.isConnected()) {
            await connectToMongoDB();
        }

        const listOfContacts = await client
            .db("contactsdb")
            .collection("contactscluster")
            .find({})
            .toArray();
        
        // console.log("Retrieved contacts:", listOfContacts);
        return listOfContacts;
    } catch (e) {
        console.error("Error fetching contacts:", e);
        throw e;
    }
}

async function singleContact(id) {
    try {
        if (!client.topology || !client.topology.isConnected()) {
            await connectToMongoDB();
        }

        let query;
        if (ObjectId.isValid(id)) {
            query = { _id: new ObjectId(id) };
        } else {
            query = { _id: id };  // If using string IDs
        }

        const contact = await client
            .db("contactsdb")
            .collection("contactscluster")
            .findOne(query);

        if (!contact) {
            throw new Error('Contact not found');
        }

        console.log("Retrieved contact:", contact);
        return contact;
    } catch (e) {
        console.error("Error fetching single contact:", e);
        throw e;
    }
}

async function addContact(newContact) {
    try {
        if (!client.topology || !client.topology.isConnected()) {
            await connectToMongoDB();
        }

        // Validation for required fields
        const { first_name, last_name, email, Birthday, color } = newContact;
        if (!first_name || !last_name || !email) {
            throw new Error("First name, last name, and email are required.");
        }

        // Example email validation (you can expand this with regex if needed)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            throw new Error("Invalid email format.");
        }

        // Add the contact to the database
        const result = await client
            .db("contactsdb")
            .collection("contactscluster")
            .insertOne(newContact);

        console.log("Added new contact:", result.insertedId);
        return { _id: result.insertedId, ...newContact }; // Return the added contact with its new ID
    } catch (e) {
        console.error("Error adding contact:", e);
        throw e;
    }
}

async function closeConnection() {
    try {
        await client.close();
        console.log("Closed MongoDB connection");
    } catch (e) {
        console.error("Error closing MongoDB connection:", e);
    }
}

module.exports = {
    connectToMongoDB,
    contacts,
    singleContact,
    closeConnection,
    addContact
};