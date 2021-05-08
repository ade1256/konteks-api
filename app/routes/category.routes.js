module.exports = app => {
  const category = require("../controllers/category.controller");

  app.post("/category", category.create);
};
