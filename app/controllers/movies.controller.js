const Movie = require("../models/movie.model.js");
const request = require('request')
const CryptoJS = require("crypto-js");
const keys = require("../config/keys.config");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const movie = new Movie({
    title: req.body.title,
    driveId: req.body.driveId,
    backupDriveId: req.body.backupDriveId,
    subtitles: req.body.subtitles,
  });

  Movie.create(req, movie, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Movie.findById(req.params.movieId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found movie with id ${req.params.movieId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving movie with id " + req.params.movieId
        });
      }
    } else res.send(data);
  });
};

exports.getSource = (req, res) => {
  Movie.getSource(req.params.movieId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found movie with id ${req.params.movieId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving movie with id " + req.params.movieId
        });
      }
    } else res.send(data);
  });
};

const decodeAES = ciphertext => {
  let bytes = CryptoJS.AES.decrypt(ciphertext, keys.secretKey);
  let originalText = bytes.toString(CryptoJS.enc.Utf8);

  return originalText
}

exports.videoplayback = (req, res) => {
  let url = req.query.url || null
  let cookie = req.query.cookie || null
  if (!url || !cookie) {
    return res.end()
  }

  url = decodeAES(url)
  cookie = JSON.parse(new Buffer.from(cookie, 'base64').toString('ascii'))

  if (!url || !cookie) {
    return res.end()
  }

  const headers = Object.assign(req.headers, { cookie })

  delete headers.host
  delete headers.referer

  const stream = request({ url, headers })

  stream.on('response', resp => {
    res.statusCode = resp.statusCode
    Object.keys(resp.headers).forEach(key => {
      res.setHeader(key, resp.headers[key])
    })
    res.setHeader('accept-ranges', 'bytes')
    res.setHeader('connection', 'keep-alive')
    res.setHeader('content-type', 'video/mp4, video/mpeg')
    res.setHeader('x-download-options', 'noopen')
    res.setHeader(
      'accept',
      'video/webm,video/ogg,video/*;q=0.9,application/ogg;q=0.7,audio/*;q=0.6,*/*;q=0.5'
    )
  })

  stream.pipe(res)

  res.on('close', () => {
    stream.abort()
  })
}


exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Movie.updateById(
    req.params.movieId,
    new Movie(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found movie with md5 ${req.params.movieId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating movie with md5 " + req.params.movieId
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Movie.remove(req.params.movieId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found movie with id ${req.params.movieId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete movie with id " + req.params.movieId
        });
      }
    } else res.send({ message: `Movie was deleted successfully!` });
  });
};

exports.getSubtitle = (req, res) => {
  Movie.getSubtitle(req.params.movieId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found movie with id ${req.params.movieId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not get subtitle movie with id " + req.params.movieId
        });
      }
    } else res.send(data);
  })
}

exports.getAll = (req, res) => {
  if(req.user.role === 'admin') {
    Movie.getAll(req, (err, data) => {
      if(err) {
        res.status(500).send({
          success: false,
          message: "Cannot get movies"
        })
      } else {
        res.send(data)
      }
    })
  } else {
    Movie.getAllByUserId(req, (err, data) => {
      if(err) {
        res.status(500).send({
          success: false,
          message: "Cannot get movies"
        })
      } else {
        res.send(data)
      }
    })
  }
}