var PowerDistributionModel = require('./PowerDistributionModel.js');

/**
 * PowerDistributionController.js
 *
 * @description :: Server-side logic for managing PowerDistributions.
 */
module.exports = {

    /**
     * PowerDistributionController.list()
     */
    list: function (req, res) {
        PowerDistributionModel.find(function (err, PowerDistributions) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PowerDistribution.',
                    error: err
                });
            }
            return res.json(PowerDistributions);
        });
    },

    /**
     * PowerDistributionController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        PowerDistributionModel.findOne({ _id: id }, function (err, PowerDistribution) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PowerDistribution.',
                    error: err
                });
            }
            if (!PowerDistribution) {
                return res.status(404).json({
                    message: 'No such PowerDistribution'
                });
            }
            return res.json(PowerDistribution);
        });
    },

    /**
     * PowerDistributionController.create()
     */
    create: function (req, res) {
        var PowerDistribution = new PowerDistributionModel({
            timestamp: req.body.timestamp,
            residentialAreaSupply: req.body.residentialAreaSupply,
            officeSupply: req.body.officeSupply,
            industrialSupply: req.body.industrialSupply,
            cost: req.body.cost

        });

        PowerDistribution.save(function (err, PowerDistribution) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating PowerDistribution',
                    error: err
                });
            }
            return res.status(201).json(PowerDistribution);
        });
    },

    /**
     * PowerDistributionController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        PowerDistributionModel.findOne({ _id: id }, function (err, PowerDistribution) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PowerDistribution',
                    error: err
                });
            }
            if (!PowerDistribution) {
                return res.status(404).json({
                    message: 'No such PowerDistribution'
                });
            }

            PowerDistribution.timestamp = req.body.timestamp ? req.body.timestamp : PowerDistribution.timestamp;
            PowerDistribution.residentialAreaSupply = req.body.residentialAreaSupply ? req.body.residentialAreaSupply : PowerDistribution.residentialAreaSupply;
            PowerDistribution.officeSupply = req.body.officeSupply ? req.body.officeSupply : PowerDistribution.officeSupply;
            PowerDistribution.industrialSupply = req.body.industrialSupply ? req.body.industrialSupply : PowerDistribution.industrialSupply;
            PowerDistribution.cost = req.body.cost ? req.body.cost : PowerDistribution.cost;

            PowerDistribution.save(function (err, PowerDistribution) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating PowerDistribution.',
                        error: err
                    });
                }

                return res.json(PowerDistribution);
            });
        });
    },
    updateData: function (req, res) {
        var timestamp = req.params.timestamp;
        PowerDistributionModel.findOne({ timestamp: timestamp }, function (err, PowerDistribution) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PowerDistribution',
                    error: err
                });
            }
            if (!PowerDistribution) {
                return res.status(404).json({
                    message: 'No such PowerDistribution'
                });
            }

            PowerDistribution.timestamp = req.body.timestamp ? req.body.timestamp : PowerDistribution.timestamp;
            PowerDistribution.residentialAreaSupply = req.body.residentialAreaSupply ? req.body.residentialAreaSupply : PowerDistribution.residentialAreaSupply;
            PowerDistribution.officeSupply = req.body.officeSupply ? req.body.officeSupply : PowerDistribution.officeSupply;
            PowerDistribution.industrialSupply = req.body.industrialSupply ? req.body.industrialSupply : PowerDistribution.industrialSupply;
            PowerDistribution.cost = req.body.cost ? req.body.cost : PowerDistribution.cost;

            PowerDistribution.save(function (err, PowerDistribution) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating PowerDistribution.',
                        error: err
                    });
                }

                return res.json(PowerDistribution);
            });
        });
    },


    /**
     * PowerDistributionController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        PowerDistributionModel.findByIdAndRemove(id, function (err, PowerDistribution) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the PowerDistribution.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
