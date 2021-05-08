module.exports = app => {
  const products = require("../controllers/products.controller");

  app.post("/products", products.create);
};
