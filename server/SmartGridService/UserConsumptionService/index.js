const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')

const HomeConsumption = require('./HomeConsumption/HomeConsumptionRouter')
const OfficeConsumption = require('./OfficeConsumption/OfficeConsumptionRoutes');
const IndustryConsumption = require('./IndustryConsumption/IndustryConsumptionRoutes');

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/UserConsumptionService");
app.use(bodyParser.json())
app.use(cors())
app.use('/smart-grid/user-consumption/home-consumption', HomeConsumption);
app.use('/smart-grid/user-consumption/office-consumption', OfficeConsumption);
app.use('/smart-grid/user-consumption/industry-consumption', IndustryConsumption);

const port = 4000;

app.listen(port, () => {
    console.log('hearing on userConsumption');
})