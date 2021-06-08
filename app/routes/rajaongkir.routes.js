module.exports = app => {
  const rajaongkir = require("../controllers/rajaongkir.controller");

  app.get("/provinces", rajaongkir.getProvinces)
  app.get("/cities", rajaongkir.getCities)
  app.get("/subdistrict", rajaongkir.getSubdistrict)
  app.post("/cek/ongkir", rajaongkir.getCost)
  app.post("/cek/resi", rajaongkir.getResi)
};
