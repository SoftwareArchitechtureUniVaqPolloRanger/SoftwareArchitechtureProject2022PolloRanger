const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/RecommendationService")
app.use(bodyParser.json());
const port = 4007;



app.listen(port, () => console.log('hearing on 4007'));

async function generateRecommendation() {
    let homeUsage = [], costData = []
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
        let response = await axios.get('http://localhost:4000/smart-grid/user-consumption/home-consumption/userId/G94-house-1');
        const usersData = response.data;
        usersData.forEach((home) => {
            costData.forEach(costPrice => {
                if (costPrice.timestamp == home.timestamp) {
                    homeUsage.push({
                        timestamp: home.timestamp,
                        unitPrice: home.totalUnits * costPrice.cost,
                        appliancesUsage: {
                            'lights': (home.appliancesUsage.lights * home.totalUnits) / 100,
                            'washingMachine': (home.appliancesUsage.washingMachine * home.totalUnits) / 100,
                            'water': (home.appliancesUsage.water * home.totalUnits) / 100,
                            'heater': (home.appliancesUsage.heater * home.totalUnits) / 100,
                            'stove': (home.appliancesUsage.stove * home.totalUnits) / 100,
                            'misc': (home.appliancesUsage.misc * home.totalUnits) / 100,

                        },
                        totalUnits: home.totalUnits
                    });
                }
            });
        })
        console.log(homeUsage)
    } catch (err) {
        console.error(err);

    }
    const hourlyUsage = {}
    homeUsage.forEach((obj) => {
        const time = new Date(obj.timestamp).getHours();
        if (!hourlyUsage[time]) {
            hourlyUsage[time] = {
                unitPrice: obj.unitPrice,
                appliancesUsage: {
                    'lights': obj.appliancesUsage.lights,
                    'washingMachine': obj.appliancesUsage.washingMachine,
                    'water': obj.appliancesUsage.water,
                    'heater': obj.appliancesUsage.heater,
                    'stove': obj.appliancesUsage.stove,
                    'misc': obj.appliancesUsage.misc,
                },
                totalUnits: obj.totalUnits
            }

        }
        else {
            hourlyUsage[time].unitPrice += obj.unitPrice;
            hourlyUsage[time].appliancesUsage.lights += obj.appliancesUsage.lights;
            hourlyUsage[time].appliancesUsage.washingMachine += obj.appliancesUsage.washingMachine;
            hourlyUsage[time].appliancesUsage.water += obj.appliancesUsage.water;
            hourlyUsage[time].appliancesUsage.heater += obj.appliancesUsage.heater;
            hourlyUsage[time].appliancesUsage.stove += obj.appliancesUsage.stove;
            hourlyUsage[time].appliancesUsage.misc += obj.appliancesUsage.misc;
            hourlyUsage[time].totalUnits += obj.totalUnits
        }
    })

    Object.entries(hourlyUsage).forEach(([hour, obj]) => {
        obj.appliancesUsage.lightPerc = (obj.appliancesUsage.lights / obj.totalUnits) * 100;
        obj.appliancesUsage.washingMachinePerc = (obj.appliancesUsage.washingMachine / obj.totalUnits) * 100;
        obj.appliancesUsage.waterPerc = (obj.appliancesUsage.water / obj.totalUnits) * 100;
        obj.appliancesUsage.heaterPerc = (obj.appliancesUsage.heater / obj.totalUnits) * 100;
        obj.appliancesUsage.stovePerc = (obj.appliancesUsage.stove / obj.totalUnits) * 100;
        obj.appliancesUsage.miscPerc = (obj.appliancesUsage.misc / obj.totalUnits) * 100;
    })
    console.log(hourlyUsage)
}

generateRecommendation();