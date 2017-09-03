const express = require("express");
const indexRoutes = express.Router();

indexRoutes.get("/", (req, res) => {
  res.render("index", req.session);
});

module.exports = indexRoutes;
