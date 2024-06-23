const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middleware/auth");

router.get("/", authenticateToken, userController.getAllUsers);
router.post("/", authenticateToken, userController.createUser);
router.delete("/:id", authenticateToken, userController.deleteUser);
router.get("/email/:email", authenticateToken, userController.findUserByEmail);
router.post("/login", userController.login); // auth not needed for login

module.exports = router;
