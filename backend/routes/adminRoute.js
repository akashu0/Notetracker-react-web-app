const express = require("express");
const bodyParser = require("body-parser");

const admin_route = express();

admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({ extended: true }));

const adminContoller = require("../controllers/adminController");
const { protect } = require("../middleware/authmiddleware");

admin_route.get("/", protect, adminContoller.getUser);
admin_route.get("/:id", adminContoller.getoneUser);
admin_route.post("/login", adminContoller.authlog);

admin_route.post("/createuser", protect, adminContoller.creteUser);
admin_route.post("/:id", adminContoller.updateUser);
admin_route.delete("/:id", adminContoller.deleteUser);

module.exports = admin_route;
