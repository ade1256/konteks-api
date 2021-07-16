module.exports = app => {
  const products = require("../controllers/products.controller");
  const checkJwt = require("../controllers/checkJwt.controller.js")
  const passport = require("passport")
  const trimRequest = require("trim-request")
  const isJWT = passport.authenticate('jwt', { session: false })

  app.post("/products", [isJWT], products.create);
  app.get("/products", products.getAll);
  app.get("/products/:slug", products.getBySlug)
  app.delete("/products/:slug", [isJWT], products.delete);
  app.put("/products/:id", [isJWT], products.update);
};
