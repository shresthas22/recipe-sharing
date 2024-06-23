const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const JWT_SECRET = process.env.JWT_SECRET;

async function getAllUsers() {
  return prisma.user.findMany();
}

async function createUser(data) {
  const { email, password } = data;

  // Validate email
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email address");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  return prisma.user.create({
    data: {
      ...data,
      email,
      password: hashedPassword,
    },
  });
}

async function deleteUser(id) {
  return prisma.user.delete({
    where: { id },
  });
}

async function findUserByEmail(email) {
  return prisma.user.findFirstOrThrow({
    where: { email },
  });
}

async function login(email, password) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

  return token;
}

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  findUserByEmail,
  login,
};
