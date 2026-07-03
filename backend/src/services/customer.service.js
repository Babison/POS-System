const prisma = require('../config/prisma');

class CustomerService {
  async getAll() {
    return await prisma.customers.findMany({
      orderBy: {
        id: 'desc'
      }
    });
  }

  async create(data) {
    return await prisma.customers.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address
      }
    });
  }

  async getById(id) {
    return await prisma.customers.findUnique({
      where: {
        id: Number(id)
      }
    });
  }
}

module.exports = new CustomerService();