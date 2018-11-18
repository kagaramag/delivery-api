// const express = require('express');
import express from 'express';

const app = express();
import { morgan } from 'mogan';

const bodyParser = require('body-parser');

const parcelRoutes = require('./v1/routes/parcels');
const userRoutes = require('./v1/routes/users');
const locationRoutes = require('./v1/routes/locations');



app.use(express.json());

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Routes which should handle request
app.use('/api/v1/parcels', parcelRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/locations', locationRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500 );
    res.json({
        error: {
            message: error.message
        }
    })
});
module.exports = app;