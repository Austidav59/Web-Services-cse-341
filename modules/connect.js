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

        const { first_name, last_name, email, birthday, color } = newContact;
        if (!first_name || !last_name || !email || !birthday || !color) {
            throw new Error("First name, last name, email, birthday, and color are required.");
        }

        const result = await client
            .db("contactsdb")
            .collection("contactscluster")
            .insertOne(newContact);

        // Return the newly added contact with the inserted ID
        return { _id: result.insertedId, ...newContact };
    } catch (e) {
        console.error("Error adding contact:", e);
        throw e;
    }
}

async function updateContact(id, updatedContact) {
    try {
        if (!client.topology || !client.topology.isConnected()) {
            await connectToMongoDB();
        }

        // Validate the ObjectId format
        if (!ObjectId.isValid(id)) {
            console.error("Invalid ObjectId format for ID:", id); // Log invalid ID
            throw new Error("Invalid ID format");
        }

        // Update the contact based on the provided ID
        const result = await client
            .db("contactsdb")
            .collection("contactscluster")
            .findOneAndUpdate(
                { _id: new ObjectId(id) }, // Filter by ObjectId
                { $set: updatedContact },   // Update contact fields
                { returnDocument: 'after' } // Return the updated document
            );

        // Check if the update was successful
        if (!result.value) {
            console.error("Contact not found or update failed for ID:", id);
            return null; // Return null if no contact was updated
        }

        console.log("Update result:", result.value); // Log the result for debugging
        return result.value; // Return the updated document
    } catch (e) {
        console.error("Error updating contact:", e);
        throw e; // Throw the error to the caller
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
    addContact,
    updateContact
};