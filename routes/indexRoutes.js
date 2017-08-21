const express = require("express");
const indexRoutes = express.Router();
const users = require("../data");

indexRoutes.get("/", (req, res) => {
  console.log(req.session);
});

module.exports = indexRoutes;
