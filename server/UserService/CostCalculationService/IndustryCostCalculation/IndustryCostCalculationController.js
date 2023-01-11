var IndustryCostCalculationModel = require('./IndustryCostCalculationModel.js');

/**
 * IndustryCostCalculationController.js
 *
 * @description :: Server-side logic for managing IndustryCostCalculations.
 */
module.exports = {

    /**
     * IndustryCostCalculationController.list()
     */
    list: function (req, res) {
        IndustryCostCalculationModel.find(function (err, IndustryCostCalculations) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting IndustryCostCalculation.',
                    error: err
                });
            }
            return res.json(IndustryCostCalculations);
        });
    },

    /**
     * IndustryCostCalculationController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        IndustryCostCalculationModel.findOne({_id: id}, function (err, IndustryCostCalculation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting IndustryCostCalculation.',
                    error: err
                });
            }
            if (!IndustryCostCalculation) {
                return res.status(404).json({
                    message: 'No such IndustryCostCalculation'
                });
            }
            return res.json(IndustryCostCalculation);
        });
    },

    /**
     * IndustryCostCalculationController.create()
     */
    create: function (req, res) {
        var IndustryCostCalculation = new IndustryCostCalculationModel({
			consumerId : req.body.consumerId,
			month : req.body.month,
			costUnit : req.body.costUnit,
			cost : req.body.cost

        });

        IndustryCostCalculation.save(function (err, IndustryCostCalculation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating IndustryCostCalculation',
                    error: err
                });
            }
            return res.status(201).json(IndustryCostCalculation);
        });
    },

    /**
     * IndustryCostCalculationController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        IndustryCostCalculationModel.findOne({_id: id}, function (err, IndustryCostCalculation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting IndustryCostCalculation',
                    error: err
                });
            }
            if (!IndustryCostCalculation) {
                return res.status(404).json({
                    message: 'No such IndustryCostCalculation'
                });
            }

            IndustryCostCalculation.consumerId = req.body.consumerId ? req.body.consumerId : IndustryCostCalculation.consumerId;
			IndustryCostCalculation.month = req.body.month ? req.body.month : IndustryCostCalculation.month;
			IndustryCostCalculation.costUnit = req.body.costUnit ? req.body.costUnit : IndustryCostCalculation.costUnit;
			IndustryCostCalculation.cost = req.body.cost ? req.body.cost : IndustryCostCalculation.cost;
			
            IndustryCostCalculation.save(function (err, IndustryCostCalculation) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating IndustryCostCalculation.',
                        error: err
                    });
                }

                return res.json(IndustryCostCalculation);
            });
        });
    },

    /**
     * IndustryCostCalculationController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        IndustryCostCalculationModel.findByIdAndRemove(id, function (err, IndustryCostCalculation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the IndustryCostCalculation.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
