var express = require('express');
var router = express.Router();
var PowerPlantController = require('./PowerPlantController.js');
var PowerPlantModel = require('./PowerPlantModel.js')
/*
 * GET
 */
router.get('/', PowerPlantController.list);

/*
 * GET
 */
router.get('/:id', PowerPlantController.show);

/*
 * GET with time
 */
router.get('/timestamp/:timestamp', function (req, res) {
    var timestamp = req.params.timestamp;
    PowerPlantModel.findOne({ timestamp: timestamp }, function (err, PowerPlant) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting HomeConsumption.',
                error: err
            });
        }
        if (!PowerPlant) {
            return res.status(404).json({
                message: 'No such HomeConsumption'
            });
        }
        return res.json(PowerPlant);
    });
})


/*
 * POST
 */
router.post('/', PowerPlantController.create);

/*
 * PUT
 */
router.put('/:id', PowerPlantController.update);

/*
 * DELETE
 */

router.put('/timestamp/:timestamp', function(req, res){
    var timestamp = req.params.timestamp;
        PowerPlantModel.findOne({ timestamp: timestamp }, function (err, PowerPlant) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PowerPlant',
                    error: err
                });
            }
            if (!PowerPlant) {
                return res.status(404).json({
                    message: 'No such PowerPlant'
                });
            }

            PowerPlant.timestamp = req.body.timestamp ? req.body.timestamp : PowerPlant.timestamp;
            PowerPlant.hydro = req.body.hydro ? req.body.hydro : PowerPlant.hydro;
            PowerPlant.solar = req.body.solar ? req.body.solar : PowerPlant.solar;
            PowerPlant.geothermal = req.body.geothermal ? req.body.geothermal : PowerPlant.geothermal;
            PowerPlant.fossilFuel = req.body.fossilFuel ? req.body.fossilFuel : PowerPlant.fossilFuel;


            PowerPlant.save(function (err, PowerPlant) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating PowerPlant.',
                        error: err
                    });
                }

                return res.json(PowerPlant);
            });
        });
})

router.delete('/:id', PowerPlantController.remove);

module.exports = router;
