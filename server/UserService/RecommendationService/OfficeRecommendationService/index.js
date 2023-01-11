const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const { off } = require('../../../PowerPlantService/PowerPlant/PowerPlantModel');
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/RecommendationService")
app.use(bodyParser.json());
const port = 4005;



app.listen(port, () => console.log('hearing on 4005'));

async function generateRecommendation() {
    let officeUsage = [], costData = []
    try {
        let response = await axios.get('http://localhost:3001/power-plant/');
        const powerData = response.data;
        costData = powerData.map(power => {
            return { cost: power.hydro.cost + power.geothermal.cost + power.solar.cost, timestamp: power.timestamp }
        })
    } catch (err) {
        console.error(err)
    }

    try {
        let response = await axios.get('http://localhost:4000/smart-grid/user-consumption/office-consumption/officeId/elixir-office');
        const usersData = response.data;
        usersData.forEach((office) => {
            costData.forEach(costPrice => {
                if (costPrice.timestamp == office.timestamp) {
                    officeUsage.push({ timestamp: office.timestamp, unitPrice: office.totalUnits * costPrice.cost, appliancesUsage: office.appliancesUsage });
                }
            });
        })
        console.log(officeUsage);
    } catch (err) {
        console.error(err);
    }
    return JSON.stringify(officeUsage)
}

app.get('/office-recommendation', generateRecommendation)