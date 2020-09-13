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