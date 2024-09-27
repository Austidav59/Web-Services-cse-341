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
        
        console.log("Retrieved contacts:", listOfContacts);
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
    closeConnection
};