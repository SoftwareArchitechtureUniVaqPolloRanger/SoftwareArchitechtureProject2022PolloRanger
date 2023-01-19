const express = require('express')
const bodyParser= require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');

const app= express();

mongoose.connect('mongodb://0.0.0.0:27017/UnusedStorageService')
app.use(cors())
app.use(bodyParser);
const PORT=2500
app.listen(PORT, ()=>{console.log('listening on 2500')});
