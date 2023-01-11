var HomeConsumptionModel = require('./HomeConsumptionModel.js');

/**
 * UserConsumptionController.js
 *
 * @description :: Server-side logic for managing UserConsumptions.
 */
module.exports = {

    /**
     * UserConsumptionController.list()
     */
    list: function (req, res) {
        HomeConsumptionModel.find(function (err, HomeConsumptions) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting UserConsumption.',
                    error: err
                });
            }
            return res.json(HomeConsumptions);
        });
    },

    /**
     * HomeConsumptionController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        HomeConsumptionModel.findOne({ _id: id }, function (err, HomeConsumption) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting HomeConsumption.',
                    error: err
                });
            }
            if (!HomeConsumption) {
                return res.status(404).json({
                    message: 'No such HomeConsumption'
                });
            }
            return res.json(HomeConsumption);
        });
    },

    /**
     * HomeConsumptionController.create()
     */
    create: function (req, res) {
        var HomeConsumption = new HomeConsumptionModel({
            timestamp: req.body.timestamp,
            userId: req.body.userId,
            totalUnits: req.body.totalUnits,
            appliancesUsage: {
                'lights': req.body.appliancesUsage.lights,
                'washingMachine': req.body.appliancesUsage.washingMachine,
                'water': req.body.appliancesUsage.water,
                'heater': req.body.appliancesUsage.heater,
                'stove': req.body.appliancesUsage.stove,
                'fridge': req.body.appliancesUsage.fridge,
                'vaccumCleaner': req.body.appliancesUsage.vaccumCleaner,
                'misc': req.body.appliancesUsage.misc
            }

        });

        HomeConsumption.save(function (err, HomeConsumption) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating UserConsumption',
                    error: err
                });
            }
            return res.status(201).json(HomeConsumption);
        });
    },

    /**
     * HomeConsumptionController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        HomeConsumptionModel.findOne({ _id: id }, function (err, HomeConsumption) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting HomeConsumption',
                    error: err
                });
            }
            if (!HomeConsumption) {
                return res.status(404).json({
                    message: 'No such HomeConsumption'
                });
            }

            HomeConsumption.timestamp = req.body.timestamp ? req.body.timestamp : HomeConsumption.timestamp;
            HomeConsumption.userId = req.body.userId ? req.body.userId : HomeConsumption.userId;
            HomeConsumption.totalUnits = req.body.totalUnits ? req.body.totalUnits : HomeConsumption.totalUnits;
            HomeConsumption.appliancesUsage = req.body.appliancesUsage ? req.body.appliancesUsage : HomeConsumption.appliancesUsage;

            HomeConsumption.save(function (err, HomeConsumption) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating HomeConsumption.',
                        error: err
                    });
                }

                return res.json(HomeConsumption);
            });
        });
    },

    /**
     * HomeConsumptionController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        HomeConsumptionModel.findByIdAndRemove(id, function (err, HomeConsumption) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the HomeConsumption.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
