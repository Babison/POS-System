const productService =
  require('../services/product.service');

class ProductController {
  async getAll(req, res) {
    const products =
      await productService.getAll();

    res.json(products);
  }

  async create(req, res) {
    const product =
      await productService.create(
        req.body
      );

    res.status(201).json(product);
  }
}

module.exports =
  new ProductController();