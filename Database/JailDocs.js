const mongoose = require("mongoose");

const jaildocs = new mongoose.Schema({
    userID: String,
    authID: String,
    roleArray: Array
});

module.exports = mongoose.model("JailDocs", jaildocs);