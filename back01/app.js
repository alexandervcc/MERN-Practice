const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/users-routes')
const placesRoutes=require('./routes/places-routes');
const HttpError=require('./model/http-error')

const app=express();

//Middleware
app.use(bodyParser.json());  //Parse Body Data, as Json

//Routes
app.use('/api/places',placesRoutes);
app.use('/api/users',userRoutes);

//404
app.use((req,res,next)=>{
    const error = new HttpError('Route cant be find: 404',404);
    throw error;
})

//Erro Middleware
app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    };
    res.status(error.code || 500);
    res.json({message:error.message||"Unknown Error Ocurred"});
});

app.listen(5000)