const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        lat: {
            type: Number,
            required: true
        },
        lon: {
            type: Number,
            required: true
        }
    },
    creator: {
        //ID: for the User Collection
        type: mongoose.Types.ObjectId,
        required: true,
        //Connect this schema to the other
        ref: 'User'
    }
});

module.exports = mongoose.model('Place', PlaceSchema);