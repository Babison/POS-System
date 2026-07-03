const inventoryService =
  require('../services/inventory.service');

class InventoryController {
  async getLogs(req, res) {
    try {
      const logs =
        await inventoryService.getLogs();

      res.json(logs);
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }

  async adjustStock(req, res) {
    try {
      const product =
        await inventoryService.adjustStock(
          req.body
        );

      res.json(product);
    } catch (err) {
      res.status(400).json({
        message: err.message
      });
    }
  }
}

module.exports =
  new InventoryController();