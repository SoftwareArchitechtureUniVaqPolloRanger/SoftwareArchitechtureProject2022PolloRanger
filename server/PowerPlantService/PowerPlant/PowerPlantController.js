var PowerPlantModel = require('./PowerPlantModel.js');

/**
 * PowerPlantController.js
 *
 * @description :: Server-side logic for managing PowerPlants.
 */
module.exports = {

    /**
     * PowerPlantController.list()
     */
    list: function (req, res) {
        PowerPlantModel.find(function (err, PowerPlants) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PowerPlant.',
                    error: err
                });
            }
            return res.json(PowerPlants);
        });
    },

    /**
     * PowerPlantController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        PowerPlantModel.findOne({ _id: id }, function (err, PowerPlant) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PowerPlant.',
                    error: err
                });
            }
            if (!PowerPlant) {
                return res.status(404).json({
                    message: 'No such PowerPlant'
                });
            }
            return res.json(PowerPlant);
        });
    },

    /**
     * PowerPlantController.create()
     */
    create: function (req, res) {
        var PowerPlant = new PowerPlantModel({
            timestamp: req.body.timestamp,
            hydro: {
                'power': req.body.hydro.power,
                'cost': req.body.hydro.cost,
                'powerUnit': req.body.hydro.powerUnit,
                'costUnit': req.body.hydro.costUnit
            },
            solar: {
                'power': req.body.solar.power,
                'cost': req.body.solar.cost,
                'powerUnit': req.body.solar.powerUnit,
                'costUnit': req.body.solar.costUnit
            },
            geothermal: {
                'power': req.body.geothermal.power,
                'cost': req.body.geothermal.cost,
                'powerUnit': req.body.geothermal.powerUnit,
                'costUnit': req.body.geothermal.costUnit
            },
            fossilFuel: {
                'power': req.body.fossilFuel.power,
                'cost': req.body.fossilFuel.cost,
                'powerUnit': req.body.fossilFuel.powerUnit,
                'costUnit': req.body.fossilFuel.costUnit
            }

        });
        console.log(PowerPlant);
        PowerPlant.save(function (err, PowerPlant) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating PowerPlant',
                    error: err
                });
            }
            return res.status(201).json(PowerPlant);
        });
    },

    /**
     * PowerPlantController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        PowerPlantModel.findOne({ _id: id }, function (err, PowerPlant) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PowerPlant',
                    error: err
                });
            }
            if (!PowerPlant) {
                return res.status(404).json({
                    message: 'No such PowerPlant'
                });
            }

            PowerPlant.timestamp = req.body.timestamp ? req.body.timestamp : PowerPlant.timestamp;
            PowerPlant.hydro = req.body.hydro ? req.body.hydro : PowerPlant.hydro;
            PowerPlant.solar = req.body.solar ? req.body.solar : PowerPlant.solar;
            PowerPlant.geothermal = req.body.geothermal ? req.body.geothermal : PowerPlant.geothermal;
            PowerPlant.fossilFuel = req.body.fossilFuel ? req.body.fossilFuel : PowerPlant.fossilFuel;


            PowerPlant.save(function (err, PowerPlant) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating PowerPlant.',
                        error: err
                    });
                }

                return res.json(PowerPlant);
            });
        });
    },

    /**
     * PowerPlantController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        PowerPlantModel.findByIdAndRemove(id, function (err, PowerPlant) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the PowerPlant.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
