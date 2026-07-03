const prisma =
  require('../config/prisma');

class SalesService {
  async createSale(data) {
    return await prisma.$transaction(
      async (tx) => {
        const sale =
          await tx.sales.create({
            data: {
              invoice_number:
                data.invoice_number,
              customer_id:
                data.customer_id,
              cashier_id:
                data.cashier_id,
              subtotal:
                data.subtotal,
              tax: data.tax,
              discount:
                data.discount,
              total: data.total,
              payment_method:
                data.payment_method,
              payment_status:
                'PAID'
            }
          });

        for (
          const item of data.items
        ) {
          await tx.sale_items.create({
            data: {
              sale_id: sale.id,
              product_id:
                item.product_id,
              quantity:
                item.quantity,
              price:
                item.price,
              total:
                item.total,
              tax:
                item.tax || 0
            }
          });

          const product =
            await tx.products.findUnique({
              where: {
                id:
                  item.product_id
              }
            });

          const newStock =
            product.stock -
            item.quantity;

          if (newStock < 0) {
            throw new Error(
              `${product.name} out of stock`
            );
          }

          await tx.products.update({
            where: {
              id:
                product.id
            },
            data: {
              stock:
                newStock
            }
          });

          await tx.inventory_logs.create({
            data: {
              product_id:
                product.id,
              old_stock:
                product.stock,
              new_stock:
                newStock,
              change_quantity:
                -item.quantity,
              action:
                'SALE',
              user_id:
                data.cashier_id
            }
          });
        }

        await tx.transactions.create({
          data: {
            sale_id:
              sale.id,
            amount:
              data.total,
            payment_method:
              data.payment_method,
            status:
              'SUCCESS'
          }
        });

        return sale;
      }
    );
  }
}

module.exports =
  new SalesService();