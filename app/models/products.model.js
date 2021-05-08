const sql = require("./db.js");
const moment = require("moment");

// constructor
const Products = function (product) {
  this.name = product.name;
  this.slug = product.slug;
  this.categoryId = product.categoryId;
  this.variants = product.variants;
};

Products.create = (newProduct, result) => {
  sql.query(
    "INSERT INTO products SET ?",
    {
      ...newProduct,
      variants: JSON.stringify(newProduct.variants),
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
        ...newProduct,
        createdAt: moment().format(),
        updatedAt: moment().format(),
      });
      result(null, {
        ...newProduct,
        createdAt: moment().format(),
        updatedAt: moment().format(),
      });
    }
  );
};

module.exports = Products;
