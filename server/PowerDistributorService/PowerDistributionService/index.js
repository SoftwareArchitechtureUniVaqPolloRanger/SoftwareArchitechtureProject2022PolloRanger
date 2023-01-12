const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const powerDistribution = require('./PowerDistribution/PowerDistributionRoutes');
var cron = require('node-cron');
const axios = require('axios');
const cors = require('cors')
const PowerDistributionModel = require('./PowerDistribution/PowerDistributionModel')

const app = express();
const port = 4002;
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/PowerDistributionService')
app.use(cors());
app.use('/power-supplier/power-distribution', powerDistribution);
app.listen(port, () => console.log('hearing on 4002'));


async function cronJob() {
    let officeDemand = {}, homeDemand = {}, industryDemand = {}, supplyPerHr = {}
    try {
        officeDemand = await axios({
            method: 'get',
            url: `http://localhost:4000/smart-grid/user-consumption/office-consumption/timestamp/2018-04-03T08:01:20.269Z`,
            json: true
        });
    } catch (err) {
        console.error(err);
    }
    try {
        homeDemand = await axios({
            method: 'get',
            url: `http://localhost:4000/smart-grid/user-consumption/home-consumption/timestamp/2018-04-03T08:01:20.269Z`,
            json: true,
        });
    } catch (err) {
        console.error(err);
    }
    try {
        industryDemand = await axios({
            method: 'get',
            url: `http://localhost:4000/smart-grid/user-consumption/industry-consumption/timestamp/2018-04-03T08:01:20.269Z`,
            json: true,
        });
    } catch (err) {
        console.error(err);
    }
    try {
        supplyPerHr = await axios({
            method: 'get',
            url: `http://localhost:3001/power-plant/timestamp/2018-04-03T08:01:20.269Z`,
            json: true,
        });
    } catch (err) {
        console.error(err);
    }
    const suppliedPower = supplyPerHr.data.hydro.power + supplyPerHr.data.solar.power + supplyPerHr.data.geothermal.power;
    const costPerHr = supplyPerHr.data.hydro.cost + supplyPerHr.data.solar.cost + supplyPerHr.data.geothermal.cost
    console.log(suppliedPower);
    if (suppliedPower >= officeDemand.data.totalUnits + homeDemand.data.totalUnits + industryDemand.data.totalUnits) {
        const officeSupply = officeDemand.data.totalUnits;
        const industrySupply = homeDemand.data.totalUnits;
        const homeSupply = industryDemand.data.totalUnits;
        try {
            var PowerDistribution = new PowerDistributionModel({
                timestamp: "2018-04-03T08:01:20.269Z",
                residentialAreaSupply: homeSupply,
                officeSupply: officeSupply,
                industrialSupply: industrySupply,
                cost: costPerHr,

            });
            PowerDistribution.save(function (err, PowerDistribution) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating PowerDistribution',
                        error: err
                    });
                }
                return JSON.stringify(PowerDistribution);
            });

        } catch (err) {
            console.error(err);
        }
    }
    else {
        const sumUsage = industryDemand.data.totalUnits + officeDemand.data.totalUnits + homeDemand.data.totalUnits
        const industryUsagePerc = ((industryDemand.data.totalUnits) / sumUsage) * 100;
        const officeUsagePerc = ((officeDemand.data.totalUnits) / sumUsage) * 100;
        const homeUsagePerc = ((homeDemand.data.totalUnits) / sumUsage) * 100;
        let percArr = [{ key: "office", val: officeUsagePerc }, { key: "ind", val: industryUsagePerc }, { key: "home", val: homeUsagePerc }];
        percArr = percArr.sort((f, s) => s.val - f.val)
        if (percArr[0].val >= 40) {
            let remainingVal = percArr[0].val - 40
            percArr[0].val = 40;
            percArr[1].val = percArr[1].val + remainingVal
            if (percArr[1].val >= 40) {
                percArr[1].val = 40;
                percArr[2].val = 100 - (percArr[0].val + percArr[1].val);
            }
        }
        const industrySupply = (((percArr.find((obj) => obj.key === "ind")).val) * suppliedPower) / 100;
        const officeSupply = (((percArr.find((obj) => obj.key === "office")).val) * suppliedPower) / 100;
        const homeSupply = (((percArr.find((obj) => obj.key === "home")).val) * suppliedPower) / 100;
        console.log(industrySupply, officeSupply, homeSupply)
        try {
            var PowerDistribution = new PowerDistributionModel({
                timestamp: (new Date()).toString(),
                residentialAreaSupply: homeSupply,
                officeSupply: officeSupply,
                industrialSupply: industrySupply,
                cost: costPerHr,

            });
            PowerDistribution.save(function (err, PowerDistribution) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating PowerDistribution',
                        error: err
                    });
                }
                return JSON.stringify(PowerDistribution);
            });
        } catch (err) {
            console.error(err);
        }
    }

}

cron.schedule('0 * * * *', cronJob);

// cronJob();


