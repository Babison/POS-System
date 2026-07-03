const categoryService =
  require('../services/category.service');

class CategoryController {
  async getAll(req, res) {
    const categories =
      await categoryService.getAll();

    res.json(categories);
  }

  async create(req, res) {
    const category =
      await categoryService.create(req.body);

    res.status(201).json(category);
  }

  async getById(req, res) {
    const category =
      await categoryService.getById(
        req.params.id
      );

    res.json(category);
  }

  async update(req, res) {
    const category =
      await categoryService.update(
        req.params.id,
        req.body
      );

    res.json(category);
  }

  async delete(req, res) {
    await categoryService.delete(
      req.params.id
    );

    res.json({
      message:
        'Category deleted'
    });
  }
}

module.exports =
  new CategoryController();