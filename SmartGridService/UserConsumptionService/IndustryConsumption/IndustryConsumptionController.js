var IndustryConsumptionModel = require('./IndustryConsumptionModel.js');

/**
 * IndustryConsumptionController.js
 *
 * @description :: Server-side logic for managing IndustryConsumptions.
 */
module.exports = {

    /**
     * IndustryConsumptionController.list()
     */
    list: function (req, res) {
        IndustryConsumptionModel.find(function (err, IndustryConsumptions) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting IndustryConsumption.',
                    error: err
                });
            }
            return res.json(IndustryConsumptions);
        });
    },

    /**
     * IndustryConsumptionController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        IndustryConsumptionModel.findOne({ _id: id }, function (err, IndustryConsumption) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting IndustryConsumption.',
                    error: err
                });
            }
            if (!IndustryConsumption) {
                return res.status(404).json({
                    message: 'No such IndustryConsumption'
                });
            }
            return res.json(IndustryConsumption);
        });
    },

    /**
     * IndustryConsumptionController.create()
     */
    create: function (req, res) {
        console.log(JSON.stringify(req.body));
        var IndustryConsumption = new IndustryConsumptionModel({
            timestamp: req.body.timestamp,
            industryId: req.body.industryId,
            totalUnits: req.body.totalUnits,
            appliancesUsage: {
                'lights': req.body.appliancesUsage.lights,
                'devices': req.body.appliancesUsage.devices,
                'thermal': req.body.appliancesUsage.thermal,
                'appliances': req.body.appliancesUsage.appliances,
                'machinery': req.body.appliancesUsage.machinery,
                'misc': req.body.appliancesUsage.misc,
            }

        });

        IndustryConsumption.save(function (err, IndustryConsumption) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating IndustryConsumption',
                    error: err
                });
            }
            return res.status(201).json(IndustryConsumption);
        });
    },

    /**
     * IndustryConsumptionController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        IndustryConsumptionModel.findOne({ _id: id }, function (err, IndustryConsumption) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting IndustryConsumption',
                    error: err
                });
            }
            if (!IndustryConsumption) {
                return res.status(404).json({
                    message: 'No such IndustryConsumption'
                });
            }

            IndustryConsumption.timestamp = req.body.timestamp ? req.body.timestamp : IndustryConsumption.timestamp;
            IndustryConsumption.industryId = req.body.industryId ? req.body.industryId : IndustryConsumption.industryId;
            IndustryConsumption.totalUnits = req.body.totalUnits ? req.body.totalUnits : IndustryConsumption.totalUnits;
            IndustryConsumption.appliancesUsage = req.body.appliancesUsage ? req.body.appliancesUsage : IndustryConsumption.appliancesUsage;

            IndustryConsumption.save(function (err, IndustryConsumption) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating IndustryConsumption.',
                        error: err
                    });
                }

                return res.json(IndustryConsumption);
            });
        });
    },

    /**
     * IndustryConsumptionController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        IndustryConsumptionModel.findByIdAndRemove(id, function (err, IndustryConsumption) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the IndustryConsumption.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
