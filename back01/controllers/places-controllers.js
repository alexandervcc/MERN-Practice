const { validationResult } = require('express-validator')
const { v4: uuidv4 } = require('uuid');
const HttpError = require('../model/http-error');

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    let xd = { id: 1, name: "Mijotron", xd: placeId }
    res.json({ xd })
};

const getUserById = (req, res, next) => {
    const userId = req.params.uid;
    let xd = { id: 1, name: "Mijotron", xd: userId }
    res.json({ xd })
};

const postCreatePlace = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalid Input Passed',422);
    }

    const { title, description, coordinates, address, creator } = req.body;
    const createdPlace = {
        id: uuidv4(), title, description, location: coordinates, address, creator
    };

    res.status(201).json({
        place: createdPlace
    })
};

const patchUpdatePlace = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalid Input Passed',422);
    }
    
    const { title, description } = req.body;
    const placeId = req.params.pid;

    //Updating...

    res.status(200).json({ place: "Updated Place" });
}

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;

    //Deleting...

    res.status(200).json({ place: "Place Deleted" })
}

module.exports = {
    getPlaceById,
    getUserById,
    postCreatePlace,
    patchUpdatePlace,
    deletePlace
}