const { MongoClient } = require("mongodb");

async function main() {
    const uri = "mongodb+srv://austin:demo123@cluster0.mhj8e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Call the listairbnb function and pass the connected client
        await listairbnb(client);

    } catch (e) {
        console.error("Error:", e);
    } finally {
        // Ensure the client is closed properly after the operation
        await client.close();
    }
}

// Function to list the first 10 Airbnb listings from the sample_airbnb collection
async function listairbnb(client) {
    try {
        const sample_airbnbList = await client
            .db("sample_airbnb")
            .collection("listingsAndReviews")
            // .find({})
            // .limit(10)
            // .toArray();
        
        // Output the retrieved documents
        console.log(sample_airbnbList);
    } catch (e) {
        console.error("Error fetching Airbnb listings:", e);
    }
}

// Run the main function
main().catch(console.error);
