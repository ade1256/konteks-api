const { google } = require('googleapis')
const getTokenGoogle = require("../lib/getTokenGoogle");

exports.createDrive = async (req, res) => {
  const token = await getTokenGoogle();
  const oauth2Client = new google.auth.OAuth2()
  oauth2Client.setCredentials({
    'access_token': token
  });

  const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
  });

  //move file to google drive

  let { name: filename, mimetype, data } = req.files.file

  const driveResponse = drive.files.create({
    requestBody: {
      name: filename,
      mimeType: mimetype
    },
    media: {
      mimeType: mimetype,
      body: Buffer.from(data).toString()
    }
  });

  driveResponse.then(data => {
    res.send(data.data)
  }).catch((error) => {
    res.status(500).send({
      message: error.message
    })
  })
}