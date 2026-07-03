const dashboardService =
  require('../services/dashboard.service');

class DashboardController {
  async getSummary(req, res) {
    try {
      const data =
        await dashboardService.getSummary();

      res.json(data);
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
}

module.exports =
  new DashboardController();