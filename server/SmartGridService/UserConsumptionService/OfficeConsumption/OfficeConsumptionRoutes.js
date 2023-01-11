var express = require('express');
var router = express.Router();
var OfficeConsumptionModel = require('./OfficeConsumptionModel.js')
var OfficeConsumptionController = require('./OfficeConsumptionController.js');

/*
 * GET
 */
router.get('/office-consumption/', OfficeConsumptionController.list);

/*
 * GET
 */
router.get('/office-consumption/:id', OfficeConsumptionController.show);

/*
 * GET with time
 */
router.get('/office-consumption/timestamp/:timestamp', function (req, res) {
    var timestamp = req.params.timestamp;
    OfficeConsumptionModel.findOne({ timestamp: timestamp }, function (err, OfficeConsumption) {
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
})
router.get('/office-consumption/officeId/:officeId', function (req, res) {
    var officeId = req.params.officeId;
    OfficeConsumptionModel.find({ officeId: officeId }, function (err, OfficeConsumption) {
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
})


/*
 * POST
 */
router.post('/office-consumption/', OfficeConsumptionController.create);

/*
 * PUT
 */
router.put('/office-consumption/:id', OfficeConsumptionController.update);

/*
 * DELETE
 */
router.delete('/office-consumption/:id', OfficeConsumptionController.remove);

module.exports = router;
