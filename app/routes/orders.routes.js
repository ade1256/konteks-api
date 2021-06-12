module.exports = app => {
  const orders = require("../controllers/orders.controller");

  app.post("/orders", orders.create);
  app.post("/upload/payment", orders.uploadPayment);
  // app.get("/uploads/:name", orders.viewUpload)
};
