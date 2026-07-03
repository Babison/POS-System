const router =
  require('express').Router();

const salesController =
  require('../controllers/sales.controller');

router.post(
  '/',
  salesController.create
);

module.exports = router;