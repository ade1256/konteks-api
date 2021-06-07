const request = require('request');
const axios = require('axios');
const config = require("../config/keys.config");

exports.getProvinces = (req, res) => {
  request(`https://api.rajaongkir.com/starter/province?key=${config.rajaOngkirKey}`, { json: true }, (err, resp, body) => {
    if (err) { return console.log(err); }
    res.send(body.rajaongkir.results)
  });
}

exports.getCities = (req, res) => {
  request(`https://api.rajaongkir.com/starter/city?key=${config.rajaOngkirKey}`, { json: true }, (err, resp, body) => {
    if (err) { return console.log(err); }
    res.send(body.rajaongkir.results)
  });
}

exports.getSubdistrict = (req, res) => {
  request(`https://api.rajaongkir.com/starter/subdistrict?key=${config.rajaOngkirKey}`, { json: true }, (err, resp, body) => {
    if (err) { return console.log(err); }
    res.send(body.rajaongkir.results)
  });
}

exports.getCost = (req, res) => {
  res.send({
    data: "Maintenance"
  })
}