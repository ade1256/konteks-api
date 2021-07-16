const sql = require("./db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys.config");
const moment = require("moment");

const Admin = function (admin) {
  this.username = admin.username;
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

Admin.login = (admin, result) => {
  sql.query(`SELECT * FROM admins WHERE username = '${admin.username}'`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length > 0) {
      bcrypt.compare(admin.password, res[0].password, function (
        errLogin,
        isLogin
      ) {
        if (isLogin) {
          const payload = {
            id: res[0].id,
            name: res[0].name,
            username: res[0].username,
            phone: res[0].phone,
          };

          jwt.sign(
            payload,
            keys.secretKey,
            { expiresIn: 3600 },
            (err, token) => {
              result(null, {
                id: res[0].id,
                username: res[0].username,
                name: res[0].name,
                phone: res[0].phone,
                isLogin: true,
                token,
              });
            }
          );
        } else {
          result({
            isLogin: false,
            message: "Wrong password !",
          }, null);
        }
      });
    }

    if (res.length === 0) {
      result({
        isLogin: false,
        message: "Wrong password !",
      }, null);
    }
  });
};


module.exports = Admin;
