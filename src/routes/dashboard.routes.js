const express = require("express");
const dashboardRouter = express.Router();

dashboardRouter.get("/home", (req, res) => {
  res.send("hello friend");
});

module.exports = dashboardRouter;
