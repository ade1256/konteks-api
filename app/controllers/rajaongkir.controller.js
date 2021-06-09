const axios = require('axios');
const config = require("../config/keys.config");

const axiosInstance = axios.create({
  baseURL: 'https://pro.rajaongkir.com/api/'
});

axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axiosInstance.defaults.headers.post['key'] = config.rajaOngkirKey;

exports.getProvinces = async (req, res) => {
  let provinces = []
  await axiosInstance.get(`/province?key=${config.rajaOngkirKey}`).then(resp => {
    resp.data.rajaongkir.results.map((item, key) => {
      provinces.push({
        id: item.province_id,
        name: item.province
      })
    })
  }).catch(err => {
    res.send(err.response.data.rajaongkir)
  })
  res.send(provinces)
}

exports.getCities = async (req, res) => {
  let cities = []
  let filter = `?key=${config.rajaOngkirKey}`;
  if (req.query.province !== undefined) {
    filter = filter + `&province=${req.query.province}`
  }
  await axiosInstance.get(`/city${filter}`).then(resp => {
    resp.data.rajaongkir.results.map((item, key) => {
      cities.push({
        id: item.city_id,
        name: item.city_name,
        type: item.type,
        postal_code: item.postal_code
      })
    })
  }).catch(err => {
    res.send(err.response.data.rajaongkir)
  })
  res.send(cities)
}

exports.getSubdistrict = async (req, res) => {
  let newArray = []
  await axiosInstance.get(`/subdistrict?key=${config.rajaOngkirKey}`, {
    params: {
      city: req.query.city,
      id: req.query.id
    }
  }).then(resp => {
    resp.data.rajaongkir.results.map((item, key) => {
      newArray.push({
        id: item.subdistrict_id,
        name: item.subdistrict_name
      })
    })
  }).catch(err => {
    res.send(err.response.data.rajaongkir)
  })
  res.send(newArray)
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