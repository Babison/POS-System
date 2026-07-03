const router =
  require('express').Router();

const productController =
  require('../controllers/product.controller');

router.get(
  '/',
  productController.getAll
);

router.post(
  '/',
  productController.create
);

module.exports = router;