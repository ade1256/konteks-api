const Admin = require("../models/admins.model.js");

// Create and Save a new Admin
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Admin
  const admin = new Admin({
    username: req.body.username,
    name: req.body.name,
    password: req.body.password
  });

  // Save Admin in the database
  Admin.create(admin, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Admin."
      });
    else res.send(data);
  });
};