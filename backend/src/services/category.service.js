const prisma = require('../config/prisma');

class CategoryService {
  async getAll() {
    return await prisma.categories.findMany({
      orderBy: {
        id: 'asc'
      }
    });
  }

  async create(data) {
    return await prisma.categories.create({
      data: {
        name: data.name,
        description: data.description
      }
    });
  }

  async getById(id) {
    return await prisma.categories.findUnique({
      where: {
        id: Number(id)
      }
    });
  }

  async update(id, data) {
    return await prisma.categories.update({
      where: {
        id: Number(id)
      },
      data
    });
  }

  async delete(id) {
    return await prisma.categories.delete({
      where: {
        id: Number(id)
      }
    });
  }
}

module.exports = new CategoryService();