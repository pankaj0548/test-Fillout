const { Router } = require('express'); 
const filloutController = require('../controllers/fillout.controller'); 
const router = Router(); 

router.get('/:formId/filteredResponses', filloutController.getFilloutFormData); 

module.exports = router;
