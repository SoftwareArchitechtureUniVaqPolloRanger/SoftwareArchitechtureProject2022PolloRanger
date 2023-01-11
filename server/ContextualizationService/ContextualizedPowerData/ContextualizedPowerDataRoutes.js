var express = require('express');
var router = express.Router();
var ContextualizedPowerDataController = require('./ContextualizedPowerDataController.js');

/*
 * GET
 */
router.get('/', ContextualizedPowerDataController.list);

/*
 * GET
 */
router.get('/:id', ContextualizedPowerDataController.show);

/*
 * POST
 */
router.post('/', ContextualizedPowerDataController.create);

/*
 * PUT
 */
router.put('/:id', ContextualizedPowerDataController.update);

/*
 * DELETE
 */
router.delete('/:id', ContextualizedPowerDataController.remove);

module.exports = router;
