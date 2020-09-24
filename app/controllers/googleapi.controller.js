const { google } = require('googleapis')
const CryptoJS = require("crypto-js");
const getTokenGoogle = require("../lib/getTokenGoogle");
const keys = require("../config/keys.config");
var FormData = require('form-data');
var fs = require('fs');

var axios = require('axios');

const decodeAES = ciphertext => {
  let bytes = CryptoJS.AES.decrypt(ciphertext, keys.secretKey);
  let originalText = bytes.toString(CryptoJS.enc.Utf8);

  return originalText
}

exports.createDrive = async (req, res) => {
  const token = await getTokenGoogle();
  const formData = new FormData()
  const oauth2Client = new google.auth.OAuth2()
  oauth2Client.setCredentials({
    'access_token': token
  });
  const drive = google.drive({
    version: 'v2',
    auth: oauth2Client
  });

  const headers = {
    ...formData.getHeaders(),
    'Content-Type': req.files.file.mimetype,
    'Authorization': `Bearer ${token}`,
    'X-Upload-Content-Type': req.files.file.mimetype,
    'X-Upload-Content-Length': req.files.file.size,
    'Content-Length': req.files.file.size
  }

  const url = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=media'

  const config = {
    method: 'post',
    url,
    headers,
    data: req.files.file.data,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  }
  // application/vnd.google-apps.video
  await axios(config)
    .then(function (response) {
      drive.files.patch({
        'fileId': response.data.id,
        'resource': {'title': req.files.file.name}
      });
      response.data.name = req.files.file.name
      res.send(response.data)
    })
    .catch(function (error) {
      res.status(500).send({
        message: error.message
      })
    });
}

exports.streamOriginal = async (req, res) => {
  const token = await getTokenGoogle();
  const oauth2Client = new google.auth.OAuth2()
  oauth2Client.setCredentials({
    'access_token': token
  });
  const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
  });

  const fileId = decodeAES(req.query.driveId);
  // const fileId = '1Kk2ezso1drS1l7jXXpvre5_loVLPkx54'

  return drive.files
    .get({ fileId, alt: 'media' }, { responseType: 'stream' })
    .then(resp => {
      return new Promise((resolve, reject) => {

        const head = {
          'Content-Range': `bytes 1024-2048/${resp.headers['content-length']}`,
          'Accept-Ranges': 'bytes',
          'Content-Type': 'video/mp4',
          'Connection': 'keep-alive',
          'Accept': 'video/webm,video/ogg,video/*;q=0.9,application/ogg;q=0.7,audio/*;q=0.6,*/*;q=0.5',
          'Content-Length': resp.headers['content-length'],
          'Transfer-Encoding': 'chunked'
        }

        // kalo headers nya original jadinya bakal download di browser
        console.log("stream original")
        res.writeHead(200, head)
        resp.data.pipe(res);
      });
    });
}

exports.downloadFile = async (req, res) => {
  const token = await getTokenGoogle();
  const oauth2Client = new google.auth.OAuth2()
  oauth2Client.setCredentials({
    'access_token': token
  });
  const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
  });

  const fileId = decodeAES(req.query.driveId);

  return drive.files
    .get({ fileId, alt: 'media' }, { responseType: 'stream' })
    .then(resp => {
      return new Promise((resolve, reject) => {
        // kalo headers nya original jadinya bakal download di browser
        const head = {
          ...resp.headers,
          'Content-Type': 'video/mp4'
        }
        console.log("download file")
        res.writeHead(200, head)
        resp.data.pipe(res);
      });
    });
}