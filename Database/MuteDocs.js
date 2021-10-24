const mongoose = require("mongoose");

const mutedocs = new mongoose.Schema({
    userID: String,
    authID: String
});

module.exports = mongoose.model("MuteDocs", mutedocs);