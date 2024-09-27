const database = require("../modules/connect")
// Controller logic and Functions
const friends = async (req, res) => {
    res.send("Hello Adam");
};

const oldFriends = async (req, res) => {
    res.send("Hello Mom");
};

const contacts = async (req, res) => {
    try {
        let data = await database.contacts; // Assuming this returns a Promise
        res.send(data);
    } catch (error) {
        res.status(500).send("Error fetching contacts");
    }
};

module.exports = {
    friends,
    oldFriends,
    contacts
}