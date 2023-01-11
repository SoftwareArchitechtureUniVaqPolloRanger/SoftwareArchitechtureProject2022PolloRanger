var OfficeCostCalculationModel = require('./OfficeCostCalculationModel.js');

/**
 * OfficeCostCalculationController.js
 *
 * @description :: Server-side logic for managing OfficeCostCalculations.
 */
module.exports = {

    /**
     * OfficeCostCalculationController.list()
     */
    list: function (req, res) {
        OfficeCostCalculationModel.find(function (err, OfficeCostCalculations) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting OfficeCostCalculation.',
                    error: err
                });
            }
            return res.json(OfficeCostCalculations);
        });
    },

    /**
     * OfficeCostCalculationController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        OfficeCostCalculationModel.findOne({_id: id}, function (err, OfficeCostCalculation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting OfficeCostCalculation.',
                    error: err
                });
            }
            if (!OfficeCostCalculation) {
                return res.status(404).json({
                    message: 'No such OfficeCostCalculation'
                });
            }
            return res.json(OfficeCostCalculation);
        });
    },

    /**
     * OfficeCostCalculationController.create()
     */
    create: function (req, res) {
        var OfficeCostCalculation = new OfficeCostCalculationModel({
			consumerId : req.body.consumerId,
			month : req.body.month,
			cost : req.body.cost,
			costUnit : req.body.costUnit

        });

        OfficeCostCalculation.save(function (err, OfficeCostCalculation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating OfficeCostCalculation',
                    error: err
                });
            }
            return res.status(201).json(OfficeCostCalculation);
        });
    },

    /**
     * OfficeCostCalculationController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        OfficeCostCalculationModel.findOne({_id: id}, function (err, OfficeCostCalculation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting OfficeCostCalculation',
                    error: err
                });
            }
            if (!OfficeCostCalculation) {
                return res.status(404).json({
                    message: 'No such OfficeCostCalculation'
                });
            }

            OfficeCostCalculation.consumerId = req.body.consumerId ? req.body.consumerId : OfficeCostCalculation.consumerId;
			OfficeCostCalculation.month = req.body.month ? req.body.month : OfficeCostCalculation.month;
			OfficeCostCalculation.cost = req.body.cost ? req.body.cost : OfficeCostCalculation.cost;
			OfficeCostCalculation.costUnit = req.body.costUnit ? req.body.costUnit : OfficeCostCalculation.costUnit;
			
            OfficeCostCalculation.save(function (err, OfficeCostCalculation) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating OfficeCostCalculation.',
                        error: err
                    });
                }

                return res.json(OfficeCostCalculation);
            });
        });
    },

    /**
     * OfficeCostCalculationController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        OfficeCostCalculationModel.findByIdAndRemove(id, function (err, OfficeCostCalculation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the OfficeCostCalculation.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
