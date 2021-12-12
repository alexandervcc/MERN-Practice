const { check } = require('express-validator');
const express = require('express');

const HttpError = require('../model/http-error');
const PlaceController = require('../controllers/places-controllers');

const router = express.Router();



// GET /:pid
router.get("/:pid", PlaceController.getPlaceById);

// GET /:uid
router.get("/user/:uid", PlaceController.getUserById);

//POST /:pid
router.get(
    "/",
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 }),
        check('address').not().isEmpty()
    ],
    PlaceController.postCreatePlace
);

//PATCH /:pid
router.patch(
    '/:pid',
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 })
    ],
    PlaceController.patchUpdatePlace);

//DELETE /:pid
router.delete('/:pid', PlaceController.deletePlace);


module.exports = router;