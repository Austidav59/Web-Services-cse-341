const { MongoClient } = require("mongodb");

async function main() {
    const uri = "mongodb+srv://austin:demo123@contacts.45vcq.mongodb.net/?retryWrites=true&w=majority&appName=Contacts";

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Call the listairbnb function and pass the connected client
        await contacts(client);

    } catch (e) {
        console.error("Error:", e);
    } finally {
        // Ensure the client is closed properly after the operation
        await client.close();
    }
}

// Function to list the first 10 Airbnb listings from the sample_airbnb collection
async function contacts(client) {
    try {
        const listOfContacts = await client
            .db("contactsdb")
            .collection("contactscluster")
            .find({})
            .limit(0)
            .toArray();
        
        // Output the retrieved documents
        console.log(listOfContacts);
        console.log("__________________________________________________")
    } catch (e) {
        console.error("Error fetching Airbnb listings:", e);
    }
}

// Run the main function
main().catch(console.error);
