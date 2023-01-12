const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();


const port = 3001;

const PowerPlant = require('./PowerPlant/PowerPlantRoutes');

// app.get("/", PowerPlant.get);

// app.post("/", PowerPlant.post);

mongoose.connect('mongodb://127.0.0.1:27017/PowerPlantService');

app.use(cors())
app.use(bodyParser.json());
app.use('/power-plant', PowerPlant);


app.listen(port, () => {
    console.log("hearing on port 3001");
});

