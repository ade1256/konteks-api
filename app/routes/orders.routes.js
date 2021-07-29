module.exports = app => {
  const orders = require("../controllers/orders.controller");
  const passport = require("passport")
  const isJWT = passport.authenticate('jwt', { session: false })

  app.post("/orders", orders.create);
  app.post("/upload/payment", orders.uploadPayment);
  // app.get("/uploads/:name", orders.viewUpload)
  app.get("/orders", orders.getAll)
  app.get("/orders/:id", orders.getById)
  app.delete("/orders/:id", [isJWT], orders.delete);
  app.post("/orders/status", [isJWT], orders.changeStatus)
  app.post("/orders/resi", [isJWT], orders.changeResi)
};
