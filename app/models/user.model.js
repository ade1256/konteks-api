const sql = require("./db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys.config");
const moment = require("moment");

// construct
const User = function (user) {
  this.email = user.email;
  this.name = user.name;
  this.password = user.password;
};

User.create = (newUser, result) => {
  bcrypt.hash(newUser.password, 10, function (err, hash) {
    newUser.password = hash;
    sql.query(
      "INSERT INTO users SET ?",
      {
        role: "user",
        ...newUser,
        createdAt: moment().format(),
        updatedAt: moment().format(),
      },
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }

        result(null, {
          message: `Success created user ${newUser.email}`,
        });
      }
    );
  });
};

User.login = (user, result) => {
  sql.query(`SELECT * FROM users WHERE email = '${user.email}'`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length > 0) {
      bcrypt.compare(user.password, res[0].password, function (
        errLogin,
        isLogin
      ) {
        if (isLogin) {
          const payload = {
            id: res[0].id,
            email: res[0].email,
            name: res[0].name,
            role: res[0].role,
          };

          jwt.sign(
            payload,
            keys.secretKey,
            { expiresIn: 3600 },
            (err, token) => {
              result(null, {
                id: res[0].id,
                email: res[0].email,
                name: res[0].name,
                role: res[0].role,
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

User.getAll = async (req, result) => {
  let total = 0;
  let totalPage = 0;
  let startNum = 0;
  let limitNum = 10;
  let currentPage = 1;
  let totalCurrent = 0;

  if (req.query.page !== undefined && req.query.size !== undefined) {
    limitNum = parseInt(req.query.size);
  }

  await sql.query("select count(*) as total from users", (err, res) => {
    total = res[0].total;
    totalPage = Math.ceil(total / limitNum);

    if (req.query.page > 1) {
      currentPage = parseInt(req.query.page);
      startNum = currentPage * limitNum - limitNum;
    }

    sql.query(
      `SELECT * FROM users ORDER BY createdAt DESC limit ${limitNum} OFFSET ${startNum}`,
      (err, res) => {
        if (err) {
          result(null, err);
          return;
        }
        if(res.length) {
          totalCurrent = res.length
        }
        const dataUsers = {
          size: limitNum,
          currentPage,
          totalPage,
          total,
          totalCurrent,
          content: res,
        };
        result(null, dataUsers);
      }
    );
  });
};

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, {
        id: res[0].id,
        email: res[0].email,
        name: res[0].name,
        role: res[0].role,
      });
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

User.updateById = (id, user, result) => {
  bcrypt.hash(user.password, 10, function (err, hashPassword) {
    user.password = hashPassword;
    sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
      sql.query(
        "UPDATE users SET email = ?, name = ?, password = ?, updatedAt = ? WHERE id = ?",
        [
          user.email ? user.email : res[0].email,
          user.name ? user.name : res[0].name,
          user.password ? user.password : res[0].password,
          moment().format(),
          id,
        ],
        (err, res) => {
          if (err) {
            result(null, err);
            return;
          }

          if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
          }

          result(null, { id: id, ...user });
        }
      );
    });
  });
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

module.exports = User;
