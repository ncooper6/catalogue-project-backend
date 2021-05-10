import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoutes from './routes/products.js';
import userRoutes from './routes/user.js';

const app = express();//tells the app express is being used
dotenv.config(); //allows for env files to be used to hide things like connection URL and port numbers

app.use(bodyParser.json({limit : '30mb', extended: true}));//Parses incoming request bodies in middleware 
app.use(bodyParser.urlencoded({limit : '30mb', extended: true}));
app.use(cors());

app.get('/', (req,res) => {
    res.send('Hello to catalogue API')
})//helps with hosting to identify there is a connection to the API

app.use('/products', productRoutes);//routes to use
app.use('/user', userRoutes);

const PORT = process.env.PORT; //PORT to use when hosting

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true}) //tells the backend wherer the server is located so it can connect
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error)=> console.log(error.message));

    mongoose.set('useFindAndModify', false);