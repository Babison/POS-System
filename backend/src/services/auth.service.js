const prisma =
  require('../config/prisma');

const {
  hashPassword,
  comparePassword
} = require('../utils/password');

const {
  generateToken
} = require('../utils/jwt');

class AuthService {
  async register(data) {
    const existingUser =
      await prisma.users.findUnique({
        where: {
          email: data.email
        }
      });

    if (existingUser) {
      throw new Error(
        'User already exists'
      );
    }

    const hashedPassword =
      await hashPassword(data.password);

    const user =
      await prisma.users.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          role_id: data.role_id || 3
        }
      });

    return user;
  }

  async login(email, password) {
    const user =
      await prisma.users.findUnique({
        where: {
          email
        }
      });

    if (!user)
      throw new Error(
        'Invalid credentials'
      );

    const valid =
      await comparePassword(
        password,
        user.password
      );

    if (!valid)
      throw new Error(
        'Invalid credentials'
      );

    const token =
      generateToken({
        id: user.id,
        email: user.email,
        role: user.role_id
      });

    return {
      token,
      user
    };
  }
}

module.exports =
  new AuthService();