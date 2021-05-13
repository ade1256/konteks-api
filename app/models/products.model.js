const sql = require("./db.js");
const moment = require("moment");

// constructor
const Products = function (product) {
  this.name = product.name;
  this.slug = product.slug;
  this.categoryId = product.categoryId;
  this.variants = product.variants;
  this.description = product.description;
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

Products.getAll = (filter, result) => {
  let offset = (filter.page*10)-10
  const queryGetAll = `SELECT * FROM products LIMIT 10 OFFSET ${offset}`
  sql.query(queryGetAll, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    let parseJson = []
    res.map(product => {
      parseJson.push({
        ...product,
        variants: JSON.parse(product.variants)
      })
      return ''
    })
    result(null, parseJson)
  })
}

Products.getBySlug = (slug, result) => {
  const queryGet = `SELECT * FROM products WHERE slug = '${slug}'`
  sql.query(queryGet, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    let parseJson = {}
    res.map(product => {
      parseJson = {
        ...product,
        variants: JSON.parse(product.variants)
      }
      return ''
    })
    result(null, parseJson)
  })
}

module.exports = Products;
