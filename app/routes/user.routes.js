module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  const checkJwt = require("../controllers/checkJwt.controller.js")
  const passport = require("passport")
  
  app.post("/users", users.create);
  app.post("/login", users.login);
  app.get("/users", [passport.authenticate('jwt', { session: false }), checkJwt.isAdmin],users.findAll);
  app.get("/users/:userId", [passport.authenticate('jwt', { session: false })], users.findOne);
  app.put("/users/:userId", [passport.authenticate('jwt', { session: false }), checkJwt.itsMe], users.update);
  app.delete("/users/:userId", [passport.authenticate('jwt', { session: false }), checkJwt.itsMe], users.delete);
}