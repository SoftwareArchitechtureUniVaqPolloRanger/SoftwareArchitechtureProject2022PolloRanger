var express = require('express');
var router = express.Router();
var HomeConsumptionController = require('./HomeConsumptionController.js');
var HomeConsumptionModel = require('./HomeConsumptionModel.js')
/*
 * GET
 */
router.get('/home-consumption/', HomeConsumptionController.list);

/*
 * GET
 */
router.get('/home-consumption/:id', HomeConsumptionController.show);

/*
 * GET with time
 */
router.get('/home-consumption/timestamp/:timestamp', function (req, res) {
    var timestamp = req.params.timestamp;
    HomeConsumptionModel.findOne({ timestamp: timestamp }, function (err, HomeConsumption) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting HomeConsumption.',
                error: err
            });
        }
        if (!HomeConsumption) {
            return res.status(404).json({
                message: 'No such HomeConsumption'
            });
        }
        return res.json(HomeConsumption);
    });
})


/*
 * GET with userId
 */
router.get('/home-consumption/userId/:userId', function (req, res) {
    var userId = req.params.userId;
    HomeConsumptionModel.find({ userId: userId }, function (err, HomeConsumption) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting HomeConsumption.',
                error: err
            });
        }
        if (!HomeConsumption) {
            return res.status(404).json({
                message: 'No such HomeConsumption'
            });
        }
        return res.json(HomeConsumption);
    });
})


/*
 * POST
 */
router.post('/home-consumption/', HomeConsumptionController.create);

/*
 * PUT
 */
router.put('/home-consumption/:id', HomeConsumptionController.update);

/*
 * DELETE
 */
router.delete('/home-consumption/:id', HomeConsumptionController.remove);

module.exports = router;
