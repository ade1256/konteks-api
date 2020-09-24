module.exports = (app) => {
  const googleapi = require('../controllers/googleapi.controller')
  app.post('/drive/create', googleapi.createDrive)
  app.get('/drive/download', googleapi.downloadFile)
  app.get('/drive/streamOriginal', googleapi.streamOriginal)
}