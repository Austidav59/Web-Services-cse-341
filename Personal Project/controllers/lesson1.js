const database = require("../modules/connect")
// Controller logic and Functions
const friends = (req, res) => {
    res.send("Hello Adam");
}

const oldFriends = (req, res) => {
    res.send("Hello Mom");
}



module.exports = {
    friends,
    oldFriends,
}