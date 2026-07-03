const authService =
  require('../services/auth.service');

class AuthController {
  async register(req, res) {
    try {
      const user =
        await authService.register(
          req.body
        );

      res.status(201).json({
        success: true,
        user
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  async login(req, res) {
    try {
      const data =
        await authService.login(
          req.body.email,
          req.body.password
        );

      res.json({
        success: true,
        ...data
      });
    } catch (err) {
      res.status(401).json({
        success: false,
        message: err.message
      });
    }
  }
}

module.exports =
  new AuthController();