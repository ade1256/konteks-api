module.exports = (app) => {
  const subtitle = require('../controllers/subtitle.controller')
  app.post('/subtitle', subtitle.uploadSubtitle)
  app.get('/subtitle', subtitle.getSubscene)
  app.get('/subtitle/upload/:subtitle', subtitle.getSubtitle)
}