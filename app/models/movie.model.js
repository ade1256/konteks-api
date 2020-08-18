const sql = require("./db.js");
const CryptoJS = require("crypto-js");
const keys = require("../config/keys.config");
const moment = require("moment");
const getTokenGoogle = require("../lib/getTokenGoogle");
const getLinkViewers = require("../lib/getLinkViewers");
const directDownload = require("../lib/directDownload");
const getLinkWithBearer = require("../lib/getLinkWithBearer");
const nodeCache = require("node-cache");
const CACHE = new nodeCache();

// construct
const Movie = function (movie) {
  this.title = movie.title;
  this.driveId = movie.driveId;
  this.subtitles = movie.subtitles;
};

const hashAES = (text) => {
  let ciphertext = CryptoJS.AES.encrypt(text, keys.secretKey).toString();
  return ciphertext;
};

const generateMD5 = (text) => {
  return CryptoJS.MD5(text.toString()).toString();
};

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
      let idmd5 = generateMD5(parseInt(res.insertId));
      sql.query(
        `UPDATE movies SET md5 = '${idmd5}' WHERE id = ${parseInt(
          res.insertId
        )}`,
        (errUpdateMovie, resUpdateMovie) => {
          if (errUpdateMovie) {
            result(errUpdateMovie, null);
            return;
          }

          sql.query(
            `SELECT * FROM movies WHERE id = ${parseInt(res.insertId)}`,
            (errMovie, resMovie) => {
              if (errMovie) {
                result(errMovie, null);
                return;
              }

              if (resMovie.length > 0) {
                result(null, {
                  message: `Success created movie`,
                  title: resMovie[0].title,
                  md5: resMovie[0].md5,
                });
              }
            }
          );
        }
      );
    }
  );
};

Movie.findById = (movieId, result) => {
  sql.query(`SELECT * FROM movies WHERE md5 = '${movieId}'`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    res[0].driveId = encodeURIComponent(hashAES(res[0].driveId));
    res[0].backupDriveId = encodeURIComponent(hashAES(res[0].backupDriveId));

    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Movie.getSource = async (movieId, result) => {
  const tokengoogle = await getTokenGoogle();
  const loadCache = CACHE.get(movieId);

  if (loadCache) {
    result(null, loadCache);
  }

  sql.query(
    `SELECT * FROM movies WHERE md5 = '${movieId}'`,
    async (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        let datas = null;
        let resultSrc = {
          sources: [],
          sourcesDownload: "",
          sourcesBackup: [],
          sourcesBackupDownload: "",
        };
        const datasWithBearer = await getLinkWithBearer(
          res[0].driveId,
          tokengoogle
        );
        datas = datasWithBearer;
        const cookie = new Buffer.from(JSON.stringify(datas.cookie)).toString(
          "base64"
        );
        const sources = datas.sources;
        for (let i = 0; i < sources.length; i++) {
          const label = sources[i].label;
          const urnEnc = encodeURIComponent(hashAES(sources[i].file));
          const file = `http://localhost:3000/videoplayback?url=${urnEnc}&cookie=${cookie}`;
          resultSrc.sources.push({ file, label, type: "mp4" });
        }
        resultSrc.sourcesDownload = await directDownload.getMediaLink(
          res[0].driveId,
          tokengoogle
        );

        if (res[0].backupDriveId !== "") {
          let datasBackup = null;
          const datasWithBearerBackup = await getLinkWithBearer(
            res[0].backupDriveId,
            tokengoogle
          );
          datasBackup = datasWithBearerBackup;
          const cookieBackup = new Buffer.from(
            JSON.stringify(datasBackup.cookie)
          ).toString("base64");
          const sourcesBackup = datasBackup.sources;
          for (let i = 0; i < sourcesBackup.length; i++) {
            const labelBackup = sourcesBackup[i].label;
            const urnEncBackup = encodeURIComponent(
              hashAES(sourcesBackup[i].file)
            );
            const fileBackup = `http://localhost:3000/videoplayback?url=${urnEncBackup}&cookie=${cookieBackup}`;
            resultSrc.sourcesBackup.push({
              file: fileBackup,
              label: labelBackup,
              type: "mp4",
            });
          }
          resultSrc.sourcesBackupDownload = await directDownload.getMediaLink(
            res[0].backupDriveId,
            tokengoogle
          );
        }
        CACHE.set(movieId, resultSrc, 60 * 60 * 6);
        result(null, resultSrc);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = Movie;
