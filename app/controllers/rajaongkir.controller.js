const request = require('request');
const axios = require('axios');
const config = require("../config/keys.config");

const axiosInstance = axios.create({
  baseURL: 'https://pro.rajaongkir.com/api/'
});

axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axiosInstance.defaults.headers.post['key'] = config.rajaOngkirKey;

exports.getProvinces = (req, res) => {
  axiosInstance.get(`/province?key=${config.rajaOngkirKey}`).then(resp => {
    res.send(resp.data.rajaongkir.results)
  }).catch(err => {
    res.send(err.response.data.rajaongkir)
  })
}

exports.getCities = (req, res) => {
  axiosInstance.get(`/city?key=${config.rajaOngkirKey}`).then(resp => {
    res.send(resp.data.rajaongkir.results)
  }).catch(err => {
    res.send(err.response.data.rajaongkir)
  })
}

exports.getSubdistrict = (req, res) => {
  console.log(req)
  axiosInstance.get(`/subdistrict?key=${config.rajaOngkirKey}`, {
    params: {
      city: req.query.city,
      id: req.query.id
    }
  }).then(resp => {
    res.send(resp.data.rajaongkir.results)
  }).catch(err => {
    res.send(err.response.data.rajaongkir)
  })
}

exports.getCost = (req, res) => {
  let body = {
    originType: req.body.originType,
    origin: req.body.origin,
    destination: req.body.destination,
    destinationType: req.body.destinationType,
    weight: req.body.weight,
    courier: req.body.courier
  }
  axiosInstance.post(`/cost`, body).then(resp => {
    res.send(resp.data.rajaongkir.results)
  }).catch(err => {
    res.send(err.response.data.rajaongkir)
  })
}

exports.getResi = (req, res) => {
  let body = {
    waybill: req.body.resi,
    courier: req.body.courier
  }
  axiosInstance.post('/waybill', body).then(resp => {
    res.send(resp.data.rajaongkir.results)
  }).catch(err => {
    res.send(err.response.data.rajaongkir)
  })
}