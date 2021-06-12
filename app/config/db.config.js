module.exports = {
  HOST: "127.0.0.1",
  USER: process.env.PRODUCTION_MYSQL_USER || "root",
  PASSWORD: process.env.PRODUCTION_MYSQL_PASSWORD || "",
  DB: "kontekstualkopi"
};
