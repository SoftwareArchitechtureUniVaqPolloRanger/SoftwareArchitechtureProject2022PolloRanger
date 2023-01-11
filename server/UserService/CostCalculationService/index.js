const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const axios = require('axios');
const HomeCostCalculation = require('./HomeCostCalculation/HomeCostCalculationRoutes');
const OfficeCostCalculation = require('./OfficeCostCalculation/OfficeCostCalculationRoutes');
const IndustryCostCalculation = require('./IndustryCostCalculation/IndustryCostCalculationRoutes')
const HomeCostCalculationModel = require('./HomeCostCalculation/HomeCostCalculationModel');
const OfficeCostCalculationModel = require('./OfficeCostCalculation/OfficeCostCalculationModel');
const IndustryCostCalculationModel = require('./IndustryCostCalculation/IndustryCostCalculationModel');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/CostCalculationService')
const port = 4003;
app.listen(port, () => console.log('listen on port 4003'));
async function cronJob() {
    let usersData = [], officeData = [], industryData = [], powerCost = [];
    let totalUnitsUser = 0, totalUnitsOffice = 0, totalUnitsIndustry = 0;
    try {
        const response = await axios.get('http://localhost:3001/power-plant/');
        powerCost = response.data;
    } catch (err) {
        console.log(err)
    }
    try {
        const response = await axios.get('http://localhost:4000/smart-grid/user-consumption/home-consumption/userId/G94-house-1');
        usersData = response.data
        usersData.forEach(users => {
            powerCost.forEach(power => {
                if (users.timestamp == power.timestamp) {
                    totalUnitsUser += users.totalUnits * (power.hydro.cost + power.solar.cost + power.geothermal.cost + power.fossilFuel.cost);
                }
            })
        })
        // totalUnitsUser = response.data.reduce((acc, val) => acc + val.totalUnits, 0);
    }
    catch (err) {
        console.log(err)
    }
    try {
        const response = await axios.get('http://localhost:4000/smart-grid/user-consumption/office-consumption/officeId/elixir-office');
        officeData = response.data
        officeData.forEach(office => {
            powerCost.forEach(power => {
                if (office.timestamp == power.timestamp) {
                    totalUnitsOffice += office.totalUnits * (power.hydro.cost + power.solar.cost + power.geothermal.cost + power.fossilFuel.cost);
                }
            })
        })
    } catch (err) {
        console.log(err)
    }
    try {
        const response = await axios.get('http://localhost:4000/smart-grid/user-consumption/industry-consumption/industryId/kohinoor-textile-mill');
        industryData = response.data
        industryData.forEach(industry => {
            powerCost.forEach(power => {
                if (industry.timestamp == power.timestamp) {
                    totalUnitsIndustry += industry.totalUnits * (power.hydro.cost + power.solar.cost + power.geothermal.cost + power.fossilFuel.cost);
                }
            })
        })

    } catch (err) {
        console.log(err)
    }

    const date = powerCost[0].timestamp;
    const month = new Date(date).getMonth();

    // The `getMonth()` method returns a number, so we need to convert it to a month name
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = monthNames[month];

    try {
        var HomeCost = new HomeCostCalculationModel({
            consumerId: "G94-house-1",
            cost: totalUnitsUser,
            month: monthName,
            costUnit: 'kr',
        });

        HomeCost.save(function (err, HomeCost) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating HomeCost',
                    error: err
                });
            }
            return JSON.stringify(HomeCost);
        });
    } catch (err) {
        console.error(err);
    }
    try {
        var OfficeCost = new OfficeCostCalculationModel({
            consumerId: "elixir-office",
            cost: totalUnitsOffice,
            month: monthName,
            costUnit: 'kr',
        });

        OfficeCost.save(function (err, OfficeCost) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating OfficeCost',
                    error: err
                });
            }
            return JSON.stringify(OfficeCost);
        });
    } catch (err) {
        console.error(err);
    }
    try {
        var IndustryCost = new IndustryCostCalculationModel({
            consumerId: "kohinoor-textile-mill",
            cost: totalUnitsIndustry,
            month: monthName,
            costUnit: 'kr',
        });

        IndustryCost.save(function (err, IndustryCost) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating IndustryCost',
                    error: err
                });
            }
            return JSON.stringify(IndustryCost);
        });
    } catch (err) {
        console.error(err);
    }

}

app.use(bodyParser.json());
app.use('/user/cost-calculation/home-cost', HomeCostCalculation);
app.use('/user/cost-calculation/office-cost', OfficeCostCalculation);
app.use('/user/cost-calculation/industry-cost', IndustryCostCalculation);
cron.schedule('0 0 1 * *', cronJob);
cronJob()
