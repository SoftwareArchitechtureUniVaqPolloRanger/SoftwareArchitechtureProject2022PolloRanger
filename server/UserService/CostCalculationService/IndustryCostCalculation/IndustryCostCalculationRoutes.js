var express = require('express');
var router = express.Router();
var IndustryCostCalculationController = require('./IndustryCostCalculationController.js');

/*
 * GET
 */
router.get('/', IndustryCostCalculationController.list);

/*
 * GET
 */
router.get('/:id', IndustryCostCalculationController.show);

/*
 * POST
 */
router.post('/', IndustryCostCalculationController.create);

/*
 * PUT
 */
router.put('/:id', IndustryCostCalculationController.update);

/*
 * DELETE
 */
router.delete('/:id', IndustryCostCalculationController.remove);

module.exports = router;
