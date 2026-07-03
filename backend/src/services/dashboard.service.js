const prisma = require('../config/prisma');

class DashboardService {
  async getSummary() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalProducts,
      totalCategories,
      totalCustomers,
      totalSalesToday,
      revenueToday,
      lowStock,
      recentTransactions
    ] = await Promise.all([
      prisma.products.count(),
      prisma.categories.count(),
      prisma.customers.count(),

      prisma.sales.count({
        where: {
          created_at: {
            gte: today
          }
        }
      }),

      prisma.sales.aggregate({
        _sum: {
          total: true
        },
        where: {
          created_at: {
            gte: today
          }
        }
      }),

      prisma.products.findMany({
        where: {
          stock: {
            lte: prisma.products.fields.reorder_level
          }
        }
      }),

      prisma.transactions.findMany({
        take: 10,
        orderBy: {
          created_at: 'desc'
        }
      })
    ]);

    return {
      totalProducts,
      totalCategories,
      totalCustomers,
      totalSalesToday,
      revenueToday:
        revenueToday._sum.total || 0,
      lowStock,
      recentTransactions
    };
  }
}

module.exports =
  new DashboardService();