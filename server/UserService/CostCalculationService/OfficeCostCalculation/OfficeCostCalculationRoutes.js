var express = require('express');
var router = express.Router();
var OfficeCostCalculationController = require('./OfficeCostCalculationController.js');

/*
 * GET
 */
router.get('/', OfficeCostCalculationController.list);

/*
 * GET
 */
router.get('/:id', OfficeCostCalculationController.show);

/*
 * POST
 */
router.post('/', OfficeCostCalculationController.create);

/*
 * PUT
 */
router.put('/:id', OfficeCostCalculationController.update);

/*
 * DELETE
 */
router.delete('/:id', OfficeCostCalculationController.remove);

module.exports = router;
