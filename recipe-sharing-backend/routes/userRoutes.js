const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.get("/email/:email", userController.findUserByEmail);
router.post("/login", userController.login);

module.exports = router;
