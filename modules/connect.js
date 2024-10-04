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

        if (!ObjectId.isValid(id)) {
            console.log("Invalid ObjectId format for ID:", id);
            throw new Error("Invalid ID format");
        }

        const { first_name, last_name, email, birthday, color } = updatedContact;

        const result = await client
            .db("contactsdb")
            .collection("contactscluster")
            .updateOne(
                { _id: new ObjectId(id) },
                { 
                    $set: {
                        first_name,
                        last_name,
                        email,
                        birthday,
                        color
                    }
                }
            );

        if (result.modifiedCount === 0) {
            return null;
        }

        return { _id: id, ...updatedContact };
    } catch (e) {
        console.error("Error updating contact:", e);
        throw e;
    }
};




async function closeConnection() {
    try {
        await client.close();
        console.log("Closed MongoDB connection");
    } catch (e) {
        console.error("Error closing MongoDB connection:", e);
    }
}

async function deleteContact(id) {
    try {
        if (!client.topology || !client.topology.isConnected()) {
            await connectToMongoDB();
        }

        console.log("Attempting to delete contact in database with ID:", id);

        if (!ObjectId.isValid(id)) {
            console.log("Invalid ObjectId format in database operation:", id);
            throw new Error("Invalid ID format");
        }

        const result = await client
            .db("contactsdb")
            .collection("contactscluster")
            .deleteOne({ _id: new ObjectId(id) });

        console.log("Database delete operation result:", result);

        return result;
    } catch (error) {
        console.error("Error in database deleteContact operation:", error);
        throw error;
    }
}


module.exports = {
    connectToMongoDB,
    contacts,
    singleContact,
    closeConnection,
    addContact,
    updateContact,
    deleteContact
};