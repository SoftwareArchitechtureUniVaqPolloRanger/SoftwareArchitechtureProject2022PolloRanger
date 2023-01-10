var express = require('express');
var router = express.Router();
var IndustryConsumptionController = require('./IndustryConsumptionController.js');
var IndustryConsumptionModel = require('./IndustryConsumptionModel.js')
/*
 * GET
 */
router.get('/industry-consumption/', IndustryConsumptionController.list);


/*
 * GET
 */
router.get('/industry-consumption/:id', IndustryConsumptionController.show);

/*
 * GET with time
 */
router.get('/industry-consumption/timestamp/:timestamp', function (req, res) {
    var timestamp = req.params.timestamp;
    IndustryConsumptionModel.findOne({ timestamp: timestamp }, function (err, IndustryConsumption) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting IndustryConsumption.',
                error: err
            });
        }
        if (!IndustryConsumption) {
            return res.status(404).json({
                message: 'No such IndustryConsumtion'
            });
        }
        return res.json(IndustryConsumption);
    });
})
router.get('/industry-consumption/industryId/:industryId', function (req, res) {
    var industryId = req.params.industryId;
    IndustryConsumptionModel.find({ industryId: industryId }, function (err, IndustryConsumption) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting IndustryConsumption.',
                error: err
            });
        }
        if (!IndustryConsumption) {
            return res.status(404).json({
                message: 'No such IndustryConsumtion'
            });
        }
        return res.json(IndustryConsumption);
    });
})


/*
 * POST
 */
router.post('/industry-consumption/', IndustryConsumptionController.create);

/*
 * PUT
 */
router.put('/industry-consumption/:id', IndustryConsumptionController.update);

/*
 * DELETE
 */
router.delete('/industry-consumption/:id', IndustryConsumptionController.remove);

module.exports = router;
