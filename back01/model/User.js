const validator = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    image: {
        type: String,
        required: true
    },
    places: [{
        //ID: for the User Collection
        type: mongoose.Types.ObjectId,
        required: true,
        //Connect this schema to the other
        ref: "Place"
    }]
});

UserSchema.plugin(validator);

module.exports = mongoose.model('User', UserSchema);