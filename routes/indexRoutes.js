const express = require("express");
const indexRoutes = express.Router();
const users = require("../data");

indexRoutes.get("/", function(req, res) {
  res.render("index", { game: req.session.game });
});

module.exports = indexRoutes;
