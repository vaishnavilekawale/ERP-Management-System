const express = require('express');
const grnController = require('../controllers/grnController');
const router = express.Router();

router.get('/', grnController.getAllGRNs);
router.get('/:id', grnController.getGRNById);
router.post('/', grnController.createGRN);
router.put('/:id', grnController.updateGRN);
router.delete('/:id', grnController.deleteGRN);

module.exports = router;
