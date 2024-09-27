const contacts = async (req, res) => {
    try {
        // Simulating an async database fetch (you'd replace this with your actual async DB call)
        let data = await database.contacts;
        res.send(data);
    } catch (error) {
        // Handle errors appropriately
        res.status(500).send("Error fetching contacts");
    }
};

const single = async (req, res) => {
    try {
        // Simulating an async database fetch
        let data = await database.contacts;
        res.send(data);
    } catch (error) {
        // Handle errors appropriately
        res.status(500).send("Error fetching contact");
    }
};


module.exports = {

    contacts,
    single
}