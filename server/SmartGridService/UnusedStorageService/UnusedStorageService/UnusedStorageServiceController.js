const UnusedstorageserviceModel = require('./UnusedStorageServiceModel.js');
 
 
module.exports = new class UnusedstorageserviceModel {
   list(req , res) {
       UnusedstorageserviceModel.find({} , (err, UnusedStorageServices) => {
           if (err) {
               return res.status(500).json({
                   message: 'Error when getting UnusedStorageService.',
                   error: err
               });
           }
           return res.status(200).json(UnusedStorageServices);
       });
   };
   show(req , res) {
       UnusedstorageserviceModel.findById(req.params.id,  (err, UnusedStorageService) => {
           if (err) {
               return res.status(500).json({
                   message: 'Error when getting UnusedStorageService.',
                   error: err
               });
           }
           if (!UnusedStorageService) {
               return res.status(404).json({
                   message: 'No such UnusedStorageService'
               });
           }
           return res.status(200).json(UnusedStorageService);
       });
   };
   create(req , res) {
       let UnusedStorageService = new UnusedstorageserviceModel({
			power : req.body.power,
            unit: req.body.unit,
            timestamp: req.body.timestamp
       });
 
       UnusedStorageService.save((err, UnusedStorageService) =>  {
           if (err) {
               return res.status(500).json({
                   message: 'Error when creating UnusedStorageService',
                   error: err
               });
           }
           return res.status(201).json(UnusedStorageService);
       });
   };
   update(req , res) {
       UnusedstorageserviceModel.findById(req.params.id ,  (err, UnusedStorageService) =>  {
           if (err) {
               return res.status(500).json({
                   message: 'Error when getting UnusedStorageService',
                   error: err
               });
           }
           if (!UnusedStorageService) {
               return res.status(404).json({
                   message: 'No such UnusedStorageService'
               });
           }
           UnusedStorageService.power = req.body.power ? req.body.power : UnusedStorageService.power;
           UnusedStorageService.unit = req.body.unit ? req.body.unit : UnusedStorageService.unit;
           UnusedStorageService.timestamp=req.body.timestamp ? req.body.timestamp : UnusedStorageService.timestamp
			
           UnusedStorageService.save((err, UnusedStorageService) => {
               if (err) {
                   return res.status(500).json({
                       message: 'Error when updating UnusedStorageService.',
                       error: err
                   });
               }
               return res.json(UnusedStorageService);
           });
       });
   };
   remove(req , res) {
       UnusedstorageserviceModel.findByIdAndRemove(req.params.id,  (err, UnusedStorageService) =>  {
           if (err) {
               return res.status(500).json({
                   message: 'Error when deleting the UnusedStorageService.',
                   error: err
               });
           }
           return res.status(204).json();
       });
   };
};

