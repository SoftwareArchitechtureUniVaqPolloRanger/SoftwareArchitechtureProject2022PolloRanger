var express = require('express');
var router = express.Router();
var HomeCostCalculationController = require('./HomeCostCalculationController.js');

/*
 * GET
 */
router.get('/', HomeCostCalculationController.list);

/*
 * GET
 */
router.get('/:id', HomeCostCalculationController.show);

/*
 * POST
 */
router.post('/', HomeCostCalculationController.create);

/*
 * PUT
 */
router.put('/:id', HomeCostCalculationController.update);

/*
 * DELETE
 */
router.delete('/:id', HomeCostCalculationController.remove);

module.exports = router;


