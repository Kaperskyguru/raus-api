const Validator = require("../../middlewares/validator");
const Cabins = require("./CabinController");

module.exports = (app) => {
  app.get("/cabins", Cabins.index);
  app.get("/cabins/:id", Cabins.show);
  app.put("/cabins/:id", Validator.updateCabin, Cabins.update);
  app.delete("/cabins/:id", Cabins.delete);
  app.patch("/cabins/:id", Validator.updateCabin, Cabins.update);
  app.post("/cabins", Validator.storeCabin, Cabins.store);
};
