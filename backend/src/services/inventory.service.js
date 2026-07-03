const prisma = require('../config/prisma');

class InventoryService {
  async getLogs() {
    return await prisma.inventory_logs.findMany({
      include: {
        products: true,
        users: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });
  }

  async adjustStock(data) {
    const product =
      await prisma.products.findUnique({
        where: {
          id: Number(data.product_id)
        }
      });

    if (!product) {
      throw new Error('Product not found');
    }

    const newStock =
      product.stock + Number(data.quantity);
    if (newStock < 0) {
        throw new Error(
    'Insufficient stock'
    );
    }
    const updatedProduct =
      await prisma.products.update({
        where: {
          id: product.id
        },
        data: {
          stock: newStock
        }
      });

    await prisma.inventory_logs.create({
      data: {
        product_id: product.id,
        old_stock: product.stock,
        new_stock: newStock,
        change_quantity: Number(data.quantity),
        action: data.action,
        user_id: data.user_id
      }
    });

    return updatedProduct;
  }
}

module.exports =
  new InventoryService();