module.exports = (app) => {
  const movies = require("../controllers/movies.controller.js");
  const checkJwt = require("../controllers/checkJwt.controller.js")
  const passport = require("passport")
  const isJWT = passport.authenticate('jwt', { session: false })
  
  app.post("/movies", [isJWT, checkJwt.isUser], movies.create)
  app.get("/movies/search", [isJWT], movies.searchByKeyword)
  app.get("/movies/token", [isJWT], movies.getTokenGoogle)
  app.get("/movies/:movieId", [isJWT], movies.findOne)
  app.put("/movies/:movieId", [isJWT], movies.update)
  app.get("/movies/:movieId/source", movies.getSource)
  app.get("/movies/:movieId/subtitle", movies.getSubtitle)
  app.get("/videoplayback", movies.videoplayback)
  app.delete("/movies/:movieId", [isJWT], movies.delete)
  app.get("/movies", [isJWT], movies.getAll)
}