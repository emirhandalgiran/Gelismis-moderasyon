const mongoose = require("mongoose");

const penal = new mongoose.Schema({
    userID: String,
    authID: String,
    reason: String,
    type: String,
    date: Date
});

module.exports = mongoose.model("Penalties", penal);