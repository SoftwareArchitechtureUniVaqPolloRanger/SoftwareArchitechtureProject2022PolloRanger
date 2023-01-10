var ContextualizedPowerDataModel = require('./ContextualizedPowerDataModel.js');

/**
 * ContextualizedPowerDataController.js
 *
 * @description :: Server-side logic for managing ContextualizedPowerDatas.
 */
module.exports = {

    /**
     * ContextualizedPowerDataController.list()
     */
    list: function (req, res) {
        ContextualizedPowerDataModel.find(function (err, ContextualizedPowerDatas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting ContextualizedPowerData.',
                    error: err
                });
            }
            return res.json(ContextualizedPowerDatas);
        });
    },

    /**
     * ContextualizedPowerDataController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        ContextualizedPowerDataModel.findOne({_id: id}, function (err, ContextualizedPowerData) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting ContextualizedPowerData.',
                    error: err
                });
            }
            if (!ContextualizedPowerData) {
                return res.status(404).json({
                    message: 'No such ContextualizedPowerData'
                });
            }
            return res.json(ContextualizedPowerData);
        });
    },

    /**
     * ContextualizedPowerDataController.create()
     */
    create: function (req, res) {
        var ContextualizedPowerData = new ContextualizedPowerDataModel({
			timestamp : req.body.timestamp,
			power : req.body.power,
			cost : req.body.cost,
			powerSource : req.body.powerSource

        });

        ContextualizedPowerData.save(function (err, ContextualizedPowerData) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating ContextualizedPowerData',
                    error: err
                });
            }
            return res.status(201).json(ContextualizedPowerData);
        });
    },

    /**
     * ContextualizedPowerDataController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        ContextualizedPowerDataModel.findOne({_id: id}, function (err, ContextualizedPowerData) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting ContextualizedPowerData',
                    error: err
                });
            }
            if (!ContextualizedPowerData) {
                return res.status(404).json({
                    message: 'No such ContextualizedPowerData'
                });
            }

            ContextualizedPowerData.timestamp = req.body.timestamp ? req.body.timestamp : ContextualizedPowerData.timestamp;
			ContextualizedPowerData.power = req.body.power ? req.body.power : ContextualizedPowerData.power;
			ContextualizedPowerData.cost = req.body.cost ? req.body.cost : ContextualizedPowerData.cost;
			ContextualizedPowerData.powerSource = req.body.powerSource ? req.body.powerSource : ContextualizedPowerData.powerSource;
			
            ContextualizedPowerData.save(function (err, ContextualizedPowerData) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating ContextualizedPowerData.',
                        error: err
                    });
                }

                return res.json(ContextualizedPowerData);
            });
        });
    },

    /**
     * ContextualizedPowerDataController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        ContextualizedPowerDataModel.findByIdAndRemove(id, function (err, ContextualizedPowerData) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the ContextualizedPowerData.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
