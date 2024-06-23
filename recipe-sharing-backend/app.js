require("dotenv").config();
const express = require("express");
const prisma = require("./prisma");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
// const recipeRoutes = require("./routes/recipeRoutes");

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// Middleware to attach Prisma client to the request object
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// Use routes
app.use("/api/users", userRoutes);
// app.use("/api/recipes", recipeRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on ports ${port}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
