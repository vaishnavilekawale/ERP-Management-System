const express = require('express');
const salesOrderController = require('../controllers/salesOrderController');
const router = express.Router();

router.get('/', salesOrderController.getAllSalesOrders);
router.get('/:id', salesOrderController.getSalesOrderById);
router.post('/', salesOrderController.createSalesOrder);
router.put('/:id', salesOrderController.updateSalesOrder);
router.delete('/:id', salesOrderController.deleteSalesOrder);

module.exports = router;
