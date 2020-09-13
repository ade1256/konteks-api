const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const app = express();

// CORS
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "API V1 JWDRIVEPLAYER" });
});

app.use(passport.initialize());

require("./app/config/passport.config")(passport);
require("./app/routes/customer.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/movie.routes.js")(app);
require('./app/routes/subtitle.routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
