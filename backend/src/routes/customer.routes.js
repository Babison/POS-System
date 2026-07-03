const router =
  require('express').Router();

const customerController =
  require('../controllers/customer.controller');

router.get(
  '/',
  customerController.getAll
);

router.post(
  '/',
  customerController.create
);

router.get(
  '/:id',
  customerController.getById
);

module.exports = router;