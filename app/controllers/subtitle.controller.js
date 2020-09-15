const axios = require('axios')
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();

exports.uploadSubtitle = (req, res) => {

  var config = {
    method: 'post',
    url: 'https://svr3.gdriveplayer.co/upload.php',
    headers: {
      ...data.getHeaders()
    },
    data: data
  };

  axios(config)
    .then(function (response) {
      console.log(response)
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log('error');
    });
}

exports.getSubscene = async (req, res) => {
  if(req.query.link !== undefined) {
    await axios.get(`http://gdriveplayer.to/?subtitle=${req.query.link}`, {
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'text/plain'
      }
    }).then(resp => {
      res.send(resp.data)
    }).catch(() => {
      res.status(500).send({message: 'Error'})
    })
  }
}

exports.getSubtitle = async (req, res) => {
  if(req.params.subtitle !== undefined) {
    await axios.get(`http://subtitle.gdriveplayer.us/subtitle/${req.params.subtitle}`, {
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'text/plain'
      }
    }).then(resp => {
      res.send(resp.data)
    }).catch(() => {
      res.status(500).send({message: 'Error'})
    })
  }
}