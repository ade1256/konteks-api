module.exports = app => {
  const admins = require("../controllers/admins.controller.js");

  // Create a new Customer
  app.post("/admins", admins.create);
  app.post("/login", admins.login);
};
