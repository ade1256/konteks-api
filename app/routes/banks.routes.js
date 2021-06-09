module.exports = app => {
  const banks = require("../controllers/banks.controller");

  app.get("/banks", banks.getAll);
};
