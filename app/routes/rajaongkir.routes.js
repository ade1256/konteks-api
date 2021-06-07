module.exports = app => {
  const rajaongkir = require("../controllers/rajaongkir.controller");

  app.get("/provinces", rajaongkir.getProvinces)
  app.get("/cities", rajaongkir.getCities)
  app.post("/shipping-cost", rajaongkir.getCost)
};
