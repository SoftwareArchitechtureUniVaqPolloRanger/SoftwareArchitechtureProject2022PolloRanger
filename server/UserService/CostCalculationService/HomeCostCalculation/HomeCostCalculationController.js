var HomeCostCalculationModel = require('./HomeCostCalculationModel.js');

/**
 * HomeCostCalculationController.js
 *
 * @description :: Server-side logic for managing HomeHomeCostCalculations.
 */
module.exports = {

    /**
     * HomeHomeCostCalculationController.list()
     */
    list: function (req, res) {
        HomeCostCalculationModel.find(function (err, HomeCostCalculations) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting HomeCostCalculation.',
                    error: err
                });
            }
            return res.json(HomeCostCalculations);
        });
    },

    /**
     * HomeCostCalculationController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        HomeCostCalculationModel.findOne({ _id: id }, function (err, HomeCostCalculation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting HomeCostCalculation.',
                    error: err
                });
            }
            if (!HomeCostCalculation) {
                return res.status(404).json({
                    message: 'No such HomeCostCalculation'
                });
            }
            return res.json(HomeCostCalculation);
        });
    },

    /**
     * HomeCostCalculationController.create()
     */
    create: function (req, res) {
        var HomeCostCalculation = new HomeCostCalculationModel({
            consumerId: req.body.consumerId,
            month: req.body.month,
            cost: req.body.cost,
            costUnit: req.body.costUnit

        });

        HomeCostCalculation.save(function (err, HomeCostCalculation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating HomeCostCalculation',
                    error: err
                });
            }
            return res.status(201).json(HomeCostCalculation);
        });
    },

    /**
     * HomeCostCalculationController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        HomeCostCalculationModel.findOne({ _id: id }, function (err, HomeCostCalculation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting HomeCostCalculation',
                    error: err
                });
            }
            if (!HomeCostCalculation) {
                return res.status(404).json({
                    message: 'No such HomeCostCalculation'
                });
            }

            HomeCostCalculation.consumerId = req.body.consumerId ? req.body.consumerId : HomeCostCalculation.consumerId;
            HomeCostCalculation.month = req.body.month ? req.body.month : HomeCostCalculation.month;
            HomeCostCalculation.cost = req.body.cost ? req.body.cost : HomeCostCalculation.cost;
            HomeCostCalculation.costUnit = req.body.costUnit ? req.body.costUnit : HomeCostCalculation.costUnit;

            HomeCostCalculation.save(function (err, HomeCostCalculation) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating HomeCostCalculation.',
                        error: err
                    });
                }

                return res.json(HomeCostCalculation);
            });
        });
    },

    /**
     * HomeCostCalculationController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        HomeCostCalculationModel.findByIdAndRemove(id, function (err, HomeCostCalculation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the HomeCostCalculation.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
