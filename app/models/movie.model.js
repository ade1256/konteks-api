const sql = require("./db.js");
const CryptoJS = require("crypto-js");
const keys = require("../config/keys.config");
const moment = require("moment");

// construct
const Movie = function (movie) {
  this.title = movie.title;
  this.driveId = movie.driveId;
  this.backupDriveId = movie.backupDriveId;
  this.subtitles = movie.subtitles
};

const hashAES = text => {
  let ciphertext = CryptoJS.AES.encrypt(
    text,
    keys.secretKey
  ).toString();
  // let bytes = CryptoJS.AES.decrypt(ciphertext, keys.secretKey);
  // let originalText = bytes.toString(CryptoJS.enc.Utf8);
  return ciphertext
}

Movie.create = (req, newMovie, result) => {
  
  sql.query(
    "INSERT INTO movies SET ?",
    {
      userId: parseInt(req.user.id),
      views: 0,
      ...newMovie,
      createdAt: moment().format(),
      updatedAt: moment().format(),
    },
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      newMovie.driveId = encodeURIComponent(hashAES(newMovie.driveId))
      newMovie.backupDriveId = encodeURIComponent(hashAES(newMovie.backupDriveId))
      result(null, {
        message: `Success created movie`,
        id: res.insertId,
        userId: parseInt(req.user.id),
        views: 0,
        ...newMovie,
        createdAt: moment().format(),
        updatedAt: moment().format(),
      });
    }
  );
}

module.exports = Movie;