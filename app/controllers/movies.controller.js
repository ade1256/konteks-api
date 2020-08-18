const Movie = require("../models/movie.model.js");

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
