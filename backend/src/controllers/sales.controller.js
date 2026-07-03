const salesService =
  require('../services/sales.service');

class SalesController {
  async create(req, res) {
    try {
      const sale =
        await salesService.createSale(
          req.body
        );

      res.status(201).json(sale);
    } catch (err) {
      res.status(400).json({
        message:
          err.message
      });
    }
  }
}

module.exports =
  new SalesController();