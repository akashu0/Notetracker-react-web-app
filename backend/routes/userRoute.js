const express = require("express");
const bodyParser = require("body-parser");
// const route = express.Router();
const user_route = express();

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

const userContoller = require("../controllers/userController");

user_route.post("/", userContoller.registerUser);
user_route.post("/login", userContoller.authUser);

module.exports = user_route;
