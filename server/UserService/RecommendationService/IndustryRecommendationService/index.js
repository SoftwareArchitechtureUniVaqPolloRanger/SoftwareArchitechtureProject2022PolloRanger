const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/RecommendationService")
app.use(bodyParser.json());
const port = 4006;



app.listen(port, () => console.log('hearing on 4006'));

async function generateRecommendation() {
    let costData = [], industryUsage = [];
    try {
        let response = await axios.get('http://localhost:3001/power-plant/');
        const powerData = response.data;
        costData = powerData.map(power => {
            return { cost: power.hydro.cost + power.geothermal.cost + power.solar.cost + power.fossilFuel.cost, timestamp: power.timestamp }
        })
    } catch (err) {
        console.error(err)
    }
    try {
        let response = await axios.get('http://localhost:4000/smart-grid/user-consumption/industry-consumption/industryId/kohinoor-textile-mill');
        const usersData = response.data;
        usersData.forEach((industry) => {
            costData.forEach(costPrice => {
                if (costPrice.timestamp == industry.timestamp) {
                    industryUsage.push({ timestamp: industry.timestamp, unitPrice: industry.totalUnits * costPrice.cost, appliancesUsage: industry.appliancesUsage });
                }
            });
        })
        console.log(industryUsage);
    } catch (err) {
        console.error(err);
    }
    return JSON.stringify(industryUsage)
}

app.get('/industry-recommendation', generateRecommendation)