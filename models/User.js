const mongoose = require("mongoose");
const localmongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
    username: String,
    password: String
})
userSchema.plugin(localmongoose);
const User = mongoose.model("User", userSchema);
module.exports = User;