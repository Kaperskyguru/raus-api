const Validator = require("../../middlewares/validator");
const Users = require("./UserController");

module.exports = (app) => {
  app.get("/users", Users.index);
  app.get("/users/:id", Users.show);
  app.put("/users/:id", Validator.updateUser, Users.update);
  app.put("/users/:id/assign", Validator.assignCabin, Users.assignCabin);
  app.patch("/users/:id/assign", Validator.assignCabin, Users.assignCabin);
  app.delete("/users/:id", Users.delete);
  app.patch("/users/:id", Validator.updateUser, Users.update);
  app.post("/users", Validator.storeUser, Users.store);
};
