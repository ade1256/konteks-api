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

Products.updateById = (id, product, result) => {
  sql.query(`SELECT * FROM products WHERE id = ${id}`, (err, resProduct) => {
    sql.query(
      `UPDATE products SET slug = ?, variants = ?, name = ?, categoryId = ?, description = ?, updatedAt = '${moment().format()}' WHERE id = ?`,
      [
        product.slug ? product.slug : resProduct[0].slug,
        product.variants ? JSON.stringify(product.variants) : JSON.stringify(resProduct[0].variants),
        product.name ? product.name : resProduct[0].name,
        product.categoryId ? product.categoryId : resProduct[0].categoryId,
        product.description ? product.description : resProduct[0].description,
        id
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
  
        result(null, { success: true, id: id, ...product });
      }
    );

  })
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

Products.remove = (slug, result) => {
  sql.query("DELETE FROM products WHERE slug = ?", slug, (err, res) => {
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

Products.uploadImage = async (image, result) => {
  const fileProof = image.file;
  await fileProof.mv("./uploads/" + fileProof.name);
  result(null, {
    status: true,
    url: `/uploads/${fileProof.name}`,
    message: "Successfully upload image"
  })
};

module.exports = Products;
