const customerService =
  require('../services/customer.service');

class CustomerController {
  async getAll(req, res) {
    const customers =
      await customerService.getAll();

    res.json(customers);
  }

  async create(req, res) {
    const customer =
      await customerService.create(req.body);

    res.status(201).json(customer);
  }

  async getById(req, res) {
    const customer =
      await customerService.getById(
        req.params.id
      );

    res.json(customer);
  }
}

module.exports =
  new CustomerController();