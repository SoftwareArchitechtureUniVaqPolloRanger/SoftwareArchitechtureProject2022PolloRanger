const express = require('express');
const router = express.Router();
const UnusedStorageServiceController = require('./UnusedStorageServiceController.js');
 
 
router.get('/', UnusedStorageServiceController .list.bind(UnusedStorageServiceController));
 
router.get('/:id', UnusedStorageServiceController.show.bind(UnusedStorageServiceController));
 
router.post('/', UnusedStorageServiceController.create.bind(UnusedStorageServiceController));
 
router.put('/:id', UnusedStorageServiceController.update.bind(UnusedStorageServiceController));
 
router.delete('/:id', UnusedStorageServiceController.remove.bind(UnusedStorageServiceController));
 
module.exports = router;

