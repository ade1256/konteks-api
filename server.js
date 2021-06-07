const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const fileUpload = require('express-fileupload')

const app = express();

// CORS
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// file upload
app.use(fileUpload());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "API V1 KONTEKSTUAL KOPI" });
});

app.use(passport.initialize());

require("./app/config/passport.config")(passport);
require("./app/routes/admins.routes.js")(app);
require("./app/routes/category.routes.js")(app);
require("./app/routes/products.routes.js")(app);
require("./app/routes/orders.routes.js")(app);
require("./app/routes/rajaongkir.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
