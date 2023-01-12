var express = require('express');
var router = express.Router();
var IndustryConsumptionController = require('./IndustryConsumptionController.js');
var IndustryConsumptionModel = require('./IndustryConsumptionModel.js')
/*
 * GET
 */
router.get('/', IndustryConsumptionController.list);


/*
 * GET
 */
router.get('/:id', IndustryConsumptionController.show);

/*
 * GET with time
 */
router.get('/timestamp/:timestamp', function (req, res) {
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
router.get('/industryId/:industryId', function (req, res) {
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
router.post('/', IndustryConsumptionController.create);

/*
 * PUT
 */
router.put('/:id', IndustryConsumptionController.update);

/*
 * DELETE
 */
router.delete('/:id', IndustryConsumptionController.remove);

module.exports = router;
