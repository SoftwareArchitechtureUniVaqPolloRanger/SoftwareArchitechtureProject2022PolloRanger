var express = require('express');
var router = express.Router();
var PowerDistributionController = require('./PowerDistributionController.js');

/*
 * GET
 */
router.get('/', PowerDistributionController.list);

/*
 * GET
 */
router.get('/:id', PowerDistributionController.show);

/*
 * POST
 */
router.post('/', PowerDistributionController.create);

/*
 * PUT
 */
router.put('/:id', PowerDistributionController.update);

router.put('/timestamp/:timestamp', PowerDistributionController.updateData);

/*
 * DELETE
 */
router.delete('/:id', PowerDistributionController.remove);

module.exports = router;
