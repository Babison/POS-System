const prisma =
  require('../config/prisma');

class ProductService {
  async getAll() {
    return await prisma.products.findMany({
      include: {
        categories: true
      }
    });
  }

  async create(data) {
    return await prisma.products.create({
      data: {
        barcode: data.barcode,
        name: data.name,
        description:
          data.description,
        category_id:
          Number(data.category_id),
        cost_price:
          data.cost_price,
        selling_price:
          data.selling_price,
        stock:
          data.stock || 0,
        reorder_level:
          data.reorder_level || 0,
        weight_enabled:
          data.weight_enabled ||
          false,
        unit: data.unit
      }
    });
  }
}

module.exports =
  new ProductService();