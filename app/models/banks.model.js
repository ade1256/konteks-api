const sql = require("./db.js");

// constructor
const Banks = function (banks) {
  this.accountName = banks.accountName;
  this.bankName = banks.bankName;
  this.bankNumber = banks.bankNumber;
  this.bankCode = banks.bankCode;
};

Banks.create = (newBank, result) => {
  sql.query(
    "INSERT INTO banks SET ?",
    {
      ...newBank,
    },
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created bank: ", {
        ...newBank
      });
      result(null, {
        ...newBank
      });
    }
  );
}

Banks.getAll = (result) => {
  sql.query(`SELECT * FROM banks`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  })
}


module.exports = Banks;