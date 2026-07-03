const router =
  require('express').Router();

const inventoryController =
  require('../controllers/inventory.controller');

router.get(
  '/logs',
  inventoryController.getLogs
);

router.post(
  '/adjust',
  inventoryController.adjustStock
);

module.exports = router;