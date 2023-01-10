var OfficeConsumptionModel = require('./OfficeConsumptionModel.js');

/**
 * OfficeConsumptionController.js
 *
 * @description :: Server-side logic for managing OfficeConsumptions.
 */
module.exports = {

    /**
     * OfficeConsumptionController.list()
     */
    list: function (req, res) {
        OfficeConsumptionModel.find(function (err, OfficeConsumptions) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting OfficeConsumption.',
                    error: err
                });
            }
            return res.json(OfficeConsumptions);
        });
    },

    /**
     * OfficeConsumptionController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        OfficeConsumptionModel.findOne({ _id: id }, function (err, OfficeConsumption) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting OfficeConsumption.',
                    error: err
                });
            }
            if (!OfficeConsumption) {
                return res.status(404).json({
                    message: 'No such OfficeConsumption'
                });
            }
            return res.json(OfficeConsumption);
        });
    },

    /**
     * OfficeConsumptionController.create()
     */
    create: function (req, res) {
        var OfficeConsumption = new OfficeConsumptionModel({
            timestamp: req.body.timestamp,
            officeId: req.body.officeId,
            totalUnits: req.body.totalUnits,
            appliancesUsage: {

                'lights': req.body.appliancesUsage.lights,
                'thermalPower': req.body.appliancesUsage.thermalPower,
                'devices': req.body.appliancesUsage.devices,
                'elevator': req.body.appliancesUsage.elevator,
                'cooking': req.body.appliancesUsage.cooking,
                'coffeeMachine': req.body.appliancesUsage.coffeeMachine,
                'fridge': req.body.appliancesUsage.fridge,
                'microwave': req.body.appliancesUsage.microwave,
                'misc': req.body.appliancesUsage.misc,
            }

        });

        OfficeConsumption.save(function (err, OfficeConsumption) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating OfficeConsumption',
                    error: err
                });
            }
            return res.status(201).json(OfficeConsumption);
        });
    },

    /**
     * OfficeConsumptionController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        OfficeConsumptionModel.findOne({ _id: id }, function (err, OfficeConsumption) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting OfficeConsumption',
                    error: err
                });
            }
            if (!OfficeConsumption) {
                return res.status(404).json({
                    message: 'No such OfficeConsumption'
                });
            }

            OfficeConsumption.timestamp = req.body.timestamp ? req.body.timestamp : OfficeConsumption.timestamp;
            OfficeConsumption.officeId = req.body.officeId ? req.body.officeId : OfficeConsumption.officeId;
            OfficeConsumption.totalUnits = req.body.totalUnits ? req.body.totalUnits : OfficeConsumption.totalUnits;
            OfficeConsumption.appliancesUsage = req.body.appliancesUsage ? req.body.appliancesUsage : OfficeConsumption.appliancesUsage;

            OfficeConsumption.save(function (err, OfficeConsumption) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating OfficeConsumption.',
                        error: err
                    });
                }

                return res.json(OfficeConsumption);
            });
        });
    },

    /**
     * OfficeConsumptionController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        OfficeConsumptionModel.findByIdAndRemove(id, function (err, OfficeConsumption) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the OfficeConsumption.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
