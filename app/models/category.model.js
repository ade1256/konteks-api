const sql = require("./db.js");
const moment = require("moment");

// constructor
const Category = function (category) {
  this.name = category.name;
};

Category.create = (newCategory, result) => {
  sql.query(
    "INSERT INTO category SET ?",
    {
      ...newCategory,
      createdAt: moment().format(),
      updatedAt: moment().format(),
    },
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created category: ", {
        ...newCategory,
        createdAt: moment().format(),
        updatedAt: moment().format(),
      });
      result(null, {
        ...newCategory,
        createdAt: moment().format(),
        updatedAt: moment().format(),
      });
    }
  );
};

module.exports = Category;
