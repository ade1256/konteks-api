const sql = require("./db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys.config");
const moment = require("moment");

const Admin = function (admin) {
  this.username = admin.username;
  this.name = admin.name;
  this.password = admin.password;
};

Admin.create = (newAdmin, result) => {
  bcrypt.hash(newAdmin.password, 10, function (err, hash) {
    newAdmin.password = hash;
    sql.query(
      "INSERT INTO admins SET ?",
      {
        ...newAdmin,
        createdAt: moment().format(),
        updatedAt: moment().format(),
      },
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }

        console.log("created admin: ", {
          id: res.insertId,
          ...newAdmin,
          createdAt: moment().format(),
          updatedAt: moment().format(),
        });

        result(null, {
          ...newAdmin,
          createdAt: moment().format(),
          updatedAt: moment().format(),
        });
      }
    );
  });
};

module.exports = Admin;
