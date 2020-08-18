const sql = require("../models/db");

exports.isAdmin = (req, res, next) => {
  if(req.user === undefined) {
    res.status(403).send({
      auth: false,
      message: "Error",
      message: 'id not found',
    });
  }
  else {
    sql.query(`SELECT * FROM users WHERE id = ${req.user.id}`, (err, user) => {
      if(user[0] === undefined) {
        res.status(403).send({
          message: "Error",
          message: 'User not found',
        });
      }
      
      if(err) {
        res.status(403).send({
          auth: false,
          message: "Error",
          message: 'User not found',
        });
      }
  
      if(user[0].role === 'user') {
        res.status(403).send({
          message: "Error",
          message: 'Must be admin',
        });
      }
  
      if(user[0].role === 'admin') {
        next();
      }
    })
  }
  
  return;
}

exports.itsMe = (req, res, next) => {

  if(req.user === undefined) {
    res.status(403).send({
      auth: false,
      message: "Error",
      message: 'id not found',
    });
  }
  else {
    sql.query(`SELECT * FROM users WHERE id = ${req.params.userId}`, (err, user) => {
      if(user[0] === undefined) {
        res.status(403).send({
          message: "Error",
          message: 'User not found',
        });
      }
      if(err) {
        res.status(403).send({
          auth: false,
          message: "Error",
          message: 'User not found',
        });
      }
  
      if(user[0].role === 'admin' || user[0].id === req.user.id) {
        next();
      } else {
        res.status(403).send({
          message: "Error",
          message: 'Must be yourself or admin',
        });
      }
    })
  }
  return;
}

exports.isUser = (req, res, next) => {
  if(req.user === undefined) {
    res.status(403).send({
      auth: false,
      message: "Error",
      message: 'id not found',
    });
  }
  else {
    sql.query(`SELECT * FROM users WHERE id = ${req.user.id}`, (err, user) => {
      if(user[0] === undefined) {
        res.status(403).send({
          message: "Error",
          message: 'User not found',
        });
      }
      
      if(err) {
        res.status(403).send({
          auth: false,
          message: "Error",
          message: 'User not found',
        });
      }
  
      if(user[0].role === 'user') {
        next();
      }
    })
  }
  return;
}