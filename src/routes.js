const express = require("express");

module.exports = (app) => {
  // Open API Routes here
  const openAPIRoutes = express.Router();
  require("./features/cabins/CabinRoutes")(openAPIRoutes);
  require("./features/users/UserRoutes")(openAPIRoutes);
  app.use("/api/v1/", openAPIRoutes);
};
