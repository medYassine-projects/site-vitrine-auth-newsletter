const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: false},
    password: { type: String },
});
const User = mongoose.model("user", userSchema);
module.exports = User;