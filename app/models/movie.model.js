const sql = require("./db.js");
const CryptoJS = require("crypto-js");
const keys = require("../config/keys.config");
const moment = require("moment");
const getTokenGoogle = require("../lib/getTokenGoogle");
const directDownload = require("../lib/directDownload");
const getLinkWithBearer = require("../lib/getLinkWithBearer");
const nodeCache = require("node-cache");
const CACHE = new nodeCache();

// construct
const Movie = function (movie) {
  this.title = movie.title;
  this.driveId = movie.driveId;
  this.subtitles = movie.subtitles;
  this.showDownload = movie.showDownload
  this.backupDriveId = movie.backupDriveId ? movie.backupDriveId : ''
};

const hashAES = (text) => {
  let ciphertext = CryptoJS.AES.encrypt(text, keys.secretKey).toString();
  return ciphertext;
};

const generateMD5 = (text) => {
  return CryptoJS.MD5(text.toString()).toString();
};

Movie.create = (req, newMovie, result) => {
  if(newMovie.subtitles === undefined) {
    newMovie.subtitles = ''
  }
  if(newMovie.subtitles.length) {
    newMovie.subtitles = JSON.stringify(newMovie.subtitles)
  }

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
    // res[0].driveId = encodeURIComponent(hashAES(res[0].driveId));
    // res[0].backupDriveId = encodeURIComponent(hashAES(res[0].backupDriveId));

    if (res.length) {
      if(res[0].subtitles !== '' && res[0].subtitles.length > 0) {
        res[0].subtitles = JSON.parse(res[0].subtitles)
      } else {
        res[0].subtitles = []
      }
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
          title: res[0].title
        };
        const datasWithBearer = await getLinkWithBearer(
          res[0].driveId,
          tokengoogle
        );
        datas = datasWithBearer;
        if(datas !== null) {
          const cookie = new Buffer.from(JSON.stringify(datas.cookie)).toString(
            "base64"
          );
          const sources = datas.sources;
          for (let i = 0; i < sources.length; i++) {
            const label = sources[i].label;
            const urnEnc = encodeURIComponent(hashAES(sources[i].file));
            const file = `http://localhost:3001/videoplayback?url=${urnEnc}&cookie=${cookie}`;
            resultSrc.sources.push({ file, label, type: "mp4" });
          }
        }
        resultSrc.sourcesDownload = `http://localhost:3001/drive/streamOriginal?driveId=${encodeURIComponent(hashAES(res[0].driveId))}`

        if (res[0].backupDriveId !== "") {
          let datasBackup = null;
          const datasWithBearerBackup = await getLinkWithBearer(
            res[0].backupDriveId,
            tokengoogle
          );
          datasBackup = datasWithBearerBackup;
          if(datasBackup !== null) {
            const cookieBackup = new Buffer.from(
              JSON.stringify(datasBackup.cookie)
            ).toString("base64");
            const sourcesBackup = datasBackup.sources;
            for (let i = 0; i < sourcesBackup.length; i++) {
              const labelBackup = sourcesBackup[i].label;
              const urnEncBackup = encodeURIComponent(
                hashAES(sourcesBackup[i].file)
              );
              const fileBackup = `http://localhost:3001/videoplayback?url=${urnEncBackup}&cookie=${cookieBackup}`;
              resultSrc.sourcesBackup.push({
                file: fileBackup,
                label: labelBackup,
                type: "mp4",
              });
            }
          }
          resultSrc.sourcesBackupDownload =`http://localhost:3001/drive/streamOriginal?driveId=${encodeURIComponent(hashAES(res[0].backupDriveId))}`
        }
        CACHE.set(movieId, resultSrc, 60 * 60 * 6);
        result(null, resultSrc);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

Movie.updateById = (md5, movie, result) => {
  sql.query(`SELECT * FROM movies WHERE md5 = '${md5}'`, (err, resMovie) => {
    sql.query(
      `UPDATE movies SET title = ?, driveId = ?, backupDriveId = ?, subtitles = ?, userId = ?, showDownload = ?, updatedAt = '${moment().format()}' WHERE md5 = ?`,
      [
        movie.title ? movie.title : resMovie[0].title,
        movie.driveId ? movie.driveId : resMovie[0].driveId,
        movie.backupDriveId ? movie.backupDriveId : resMovie[0].backupDriveId,
        movie.subtitles ? JSON.stringify(movie.subtitles) : resMovie[0].subtitles,
        movie.userId ? movie.userId: resMovie[0].userId,
        movie.showDownload ? movie.showDownload: resMovie[0].showDownload,
        md5
      ],
      (err, res) => {
        if (err) {
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          result({ success: false, kind: "not_found" }, null);
          return;
        }
  
        result(null, { success: true, md5: md5, ...movie });
      }
    );
  })
};

Movie.remove = (md5, result) => {
  sql.query("DELETE FROM movies WHERE md5 = ?", md5, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ success: false, kind: "not_found" }, null);
      return;
    }

    result(null, {success: true, message: "Deleted 1 row"});
  });
};

Movie.getSubtitle = (movieId, result) => {
  sql.query(`SELECT * FROM movies WHERE md5 = '${movieId}'`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    // res[0].driveId = encodeURIComponent(hashAES(res[0].driveId));
    // res[0].backupDriveId = encodeURIComponent(hashAES(res[0].backupDriveId));

    if (res.length) {
      if(res[0].subtitles !== "") {
        result(null, {
          success: true,
          subtitles : JSON.parse(res[0].subtitles)
        });
      } else {
        result(null, {
          success: true,
          subtitles : res[0].subtitles
        });
      }
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Movie.getAll = async (req, result) => {
  let total = 0;
  let totalPage = 0;
  let startNum = 0;
  let limitNum = 10;
  let currentPage = 1;
  let totalCurrent = 0;
  let content = []

  if (req.query.page !== undefined && req.query.size !== undefined) {
    limitNum = parseInt(req.query.size);
  }

  await sql.query("select count(*) as total from movies", (err, res) => {
    total = res[0].total;
    totalPage = Math.ceil(total / limitNum);

    if (req.query.page > 1) {
      currentPage = parseInt(req.query.page);
      startNum = currentPage * limitNum - limitNum;
    }

    sql.query(
      `SELECT * FROM movies ORDER BY createdAt DESC limit ${limitNum} OFFSET ${startNum}`,
      (err, res) => {
        if (err) {
          result(null, err);
          return;
        }
        if(res.length) {
          totalCurrent = res.length
          
          res.map(movies => {
            movies.subtitles = JSON.parse(movies.subtitles)
          })
        }
        const dataMovies = {
          size: limitNum,
          currentPage,
          totalPage,
          total,
          totalCurrent,
          content: res,
        };
        result(null, dataMovies);
      }
    );
  });
}

Movie.getAllByUserId = async (req, result) => {
  let total = 0;
  let totalPage = 0;
  let startNum = 0;
  let limitNum = 10;
  let currentPage = 1;
  let totalCurrent = 0;

  if (req.query.page !== undefined && req.query.size !== undefined) {
    limitNum = parseInt(req.query.size);
  }

  await sql.query(`select count(*) as total from movies WHERE userId = ${req.user.id}`, (err, res) => {
    total = res[0].total;
    totalPage = Math.ceil(total / limitNum);

    if (req.query.page > 1) {
      currentPage = parseInt(req.query.page);
      startNum = currentPage * limitNum - limitNum;
    }

    sql.query(
      `SELECT * FROM movies WHERE userId = ${req.user.id} ORDER BY createdAt DESC limit ${limitNum} OFFSET ${startNum}`,
      (err, res) => {
        if (err) {
          result(null, err);
          return;
        }
        if(res.length) {
          totalCurrent = res.length
          res.map(movies => {
            if(movies.subtitles[0] !== undefined) {
              movies.subtitles = JSON.parse(movies.subtitles)
            }
          })
        }
        const dataMovies = {
          size: limitNum,
          currentPage,
          totalPage,
          total,
          totalCurrent,
          content: res,
        };
        result(null, dataMovies);
      }
    );
  });
}

Movie.getTokenGoogle = async (result) => {
  const tokengoogle = await getTokenGoogle();
  result(null, tokengoogle)
}

module.exports = Movie;
