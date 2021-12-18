const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const HttpError = require('../model/http-error');
const Place = require('../model/Place');
const User = require("../model/User");

const getPlaceById = async (req, res, next) => {

    const placeId = req.params.pid;
    let place;

    try {
        place = await Place.findById(placeId).exec();
    } catch (error) {
        const Error = new HttpError(error, 500)
        return next(Error);
    }

    if (!place) {
        const error = new HttpError("Resource doesnt exist", 404);
        return next(error);
    }

    res.json({ place: place.toObject({ getters: true }) })
};


const getUserById = async (req, res, next) => {
    
    const userId = req.params.uid;
    let userWithPlaces;

    try {
        userWithPlaces = await User.findById(userId).populate('places');
    } catch (error) {
        const Error = new HttpError(error, 404);
        return next(Error);
    }

    if (userWithPlaces.places.length == 0) {
        const error = new HttpError("Resource doesnt exist", 404);
        return next(error);
    }

    res.json({ place: userWithPlaces.places.map(p => p.toObject({ getters: true })) });
};


const postCreatePlace = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const Error = new HttpError(errors, 500)
        return next(Error);
    }

    const { title, description, coordinates, address, creator } = req.body;

    const createdPlace = Place({
        title,
        description,
        address,
        location: coordinates,
        image: "a",
        creator
    });

    let user;
    try {
        user = await User.findById(creator)
    } catch (error) {
        const Error = new HttpError(error, 500)
        return next(Error);
    };

    if (!user) {
        const Error = new HttpError("User cant be Found", 500)
        return next(Error);
    }

    //Transaction
    try {
        const session = await mongoose.startSession()
        session.startTransaction();
        await createdPlace.save({ session: session });
        user.places.push(createdPlace);
        await user.save({ session: session });
        await session.commitTransaction();
    } catch (error) {
        const Error = new HttpError(error, 500)
        return next(Error);
    }

    res.status(201).json({
        place: createdPlace
    })
};


const patchUpdatePlace = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        let arrayErrors = errors.array().map(err => err.msg + " - " + err.param)
        const Error = new HttpError(arrayErrors, 500)
        return next(Error);
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;

    let place;

    try {
        place = await Place.findById(placeId)
    } catch (error) {
        const Error = new HttpError(error, 500)
        return next(Error);
    }

    if (title) place.title = title;
    if (description) place.description = description

    try {
        await place.save();
    } catch (error) {
        const Error = new HttpError(error, 500)
        return next(Error);
    }

    res.status(200).json({ place: place.toObject({ getters: true }) });
}


const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try {
        //.populate(): allow to refer a document stored in other collection
        //done with 'ref' at the Model
        place = await Place.findById(placeId).populate('creator');
        await place.remove();
    } catch (error) {
        const Error = new HttpError(error, 500)
        return next(Error);
    }

    if (!place) {
        const Error = new HttpError('Place cant be Found', 404)
        return next(Error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({ session: sess });
        await place.creator.places.pull(place);
        await place.creator.save({ session: sess });

        await sess.commitTransaction();
    } catch (error) {
        const Error = new HttpError(error, 500)
        return next(Error);
    }


    res.status(200).json({ place: "Place Deleted" })
}


module.exports = {
    getPlaceById,
    getUserById,
    postCreatePlace,
    patchUpdatePlace,
    deletePlace
}