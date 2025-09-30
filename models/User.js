const mongoose = require('mongoose');

// Define User.schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,   // usernames must be unique
    },
    email: {
        type: String,
        required: true,
        unique: true, // emails must be unique
        match: [/.+@.+\..+/, 'Please enter a valid email'],  // basic email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6,   // enforce stronger passwords
    },
}, { timestamps: true });  // adds createdAt & updatedAt fields automatically

module.exports = mongoose.model('User', UserSchema);