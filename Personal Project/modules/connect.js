// Load environment variables from .env
require('dotenv').config();

const { MongoClient } = require('mongodb');
// Use the MongoDB URI from .env
const client = new MongoClient(process.env.uri);
// Function to list contacts from the contactscluster collection

// grab all thres contacts
async function contacts(client) {
    try {
        const listOfContacts = await client
            .db("contactsdb")
            .collection("contactscluster")
            .find({})
            .limit(1)  // Limiting to 10 documents
            .toArray();
        
        // Output the retrieved documents
        console.dir(listOfContacts, { depth: null, colors: true });
        console.log("__________________________________________________");

    } catch (e) {
        console.error("Error fetching contacts:", e);  // More specific error message
    }
}

//grab a single contact based on id
async function singleContact(client) {

}


// Run the main function
module.exports = {
    contacts,
    singleContact
}
