module.exports = (app) => {
  const googleapi = require('../controllers/googleapi.controller')
  app.post('/drive/create', googleapi.createDrive)
}