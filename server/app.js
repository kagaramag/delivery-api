
import express from 'express';

import morgan from 'morgan';

import bodyParser from 'body-parser';

// data+time formating 
// import routes
import parcelRoutes from './v1/routes/parcels';
import userRoutes from './v1/routes/users';
import locationRoutes from './v1/routes/locations';
import authRoutes from './v1/routes/auth';
import ErrorController from './controllers/ErrorController';

const app = express();

app.use(express.json());

app.use(morgan('dev'));
import cors from 'cors';
app.use(cors());


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// swagger
import {SwaggerUIBundle, SwaggerUIStandalonePreset} from 'swagger-ui-dist';
export const swaggerUIBundle = SwaggerUIBundle;
export const swaggerUIStandalonePreset = SwaggerUIStandalonePreset;

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './../swagger';
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// swagger.setAppHandler(app);

app.use('/api/v1/parcels', parcelRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/locations', locationRoutes);
app.use('/api/v1/auth', authRoutes);

app.use(ErrorController.NotFound);
app.use(ErrorController.InternalServerError);

export default app;