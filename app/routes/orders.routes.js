module.exports = app => {
  const orders = require("../controllers/orders.controller");

  app.post("/orders", orders.create);
};
