const mongoose = require("mongoose");
const { string } = require("prop-types");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: {type: String}
});

module.exports = mongoose.model("User", userSchema);
