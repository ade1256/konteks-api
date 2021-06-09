const Banks = require("../models/banks.model.js");

exports.getAll = (req, res) => {
  Banks.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while get the Banks."
      });
    else res.send(data);
  });
}