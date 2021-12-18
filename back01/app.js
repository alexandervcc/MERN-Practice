const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const userRoutes = require('./routes/users-routes')
const placesRoutes = require('./routes/places-routes');
const HttpError = require('./model/http-error')

const app = express();

//Middleware
app.use(bodyParser.json());  //Parse Body Data, as Json

//Routes
app.use('/api/places', placesRoutes);
app.use('/api/users', userRoutes);

//404
app.use((req, res, next) => {
    const error = new HttpError('Route cant be find: 404', 404);
    throw error;
})

//Erro Middleware
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    };
    res.status(error.code || 500);
    res.json({ message: error.message || "Unknown Error Ocurred" });
});


const PORT = 5000;
const URI = "mongodb+srv://mern01:mern01@nodejs01.mxnnt.mongodb.net/mern01?retryWrites=true&w=majority";
mongoose
    .connect(URI)
    .then(() => {
        console.log("-------SERVER ON PORT", PORT, "-------")
        app.listen(PORT);
    })
    .catch(err => {
        console.log('Error Connecting Atlas')
    })