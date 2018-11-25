// import express
import express from 'express';
// import morgan for http logger
import morgan from 'morgan';
// import body-parser
import bodyParser from 'body-parser';

// import routes handlers
import parcelRoutes from './v1/routes/parcels';
import userRoutes from './v1/routes/users';
import locationRoutes from './v1/routes/locations';
import authRoutes from './v1/routes/auth';
import ErrorController from './controllers/ErrorController';

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// ALLOW CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



// Routes which should handle request
app.use('/api/v1/parcels', parcelRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/locations', locationRoutes);

app.use(ErrorController.NotFound);
app.use(ErrorController.InternalServerError);

module.exports = app;