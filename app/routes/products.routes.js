module.exports = app => {
  const products = require("../controllers/products.controller");

  app.post("/products", products.create);
  app.get("/products", products.getAll);
  app.get("/products/:slug", products.getBySlug)
};
