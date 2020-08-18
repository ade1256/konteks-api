module.exports = (app) => {
  const movies = require("../controllers/movies.controller.js");
  const checkJwt = require("../controllers/checkJwt.controller.js")
  const passport = require("passport")
  
  app.post("/movies", [passport.authenticate('jwt', { session: false }), checkJwt.isUser], movies.create)
  app.get("/movies/:movieId", movies.findOne)
  app.get("/movies/:movieId/source", movies.getSource)
  app.get("/videoplayback", movies.videoplayback)
}