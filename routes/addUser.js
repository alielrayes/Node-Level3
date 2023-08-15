const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const {requireAuth} = require("../middleware/middleware")

router.get("",requireAuth, userController.user_add_get);
// POST Requst
router.post("", userController.user_post);

module.exports = router;
