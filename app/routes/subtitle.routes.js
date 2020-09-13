module.exports = (app) => {
  const subtitle = require('../controllers/subtitle.controller')
  app.post('/subtitle', subtitle.uploadSubtitle)
}