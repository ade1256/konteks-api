const Products = require("../models/products.model")

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const product = new Products({
    name: req.body.name,
    slug: req.body.slug,
    categoryId: req.body.categoryId,
    variants: req.body.variants,
    description: req.body.description
  });

  Products.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Products."
      });
    else res.send(data);
  });
};

exports.getAll = (req, res) => {
  // const isEmptyFilters = Object.keys(req.query).length === 0

  let filters = {
    page: req.query.page === undefined ? 1 : req.query.page,
    keyword: req.query.keyword === undefined ? "" : req.query.keyword
  }
  Products.getAll(filters, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while get the Products."
      });
    else res.send(data);
  });
}

exports.getBySlug = (req, res) => {
  Products.getBySlug(req.params.slug, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while get the Products."
      });
    else res.send(data);
  });
}

exports.delete = (req, res) => {
  Products.remove(req.params.slug, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found product with id ${req.params.slug}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete product with id " + req.params.slug
        });
      }
    } else res.send({ message: `Product was deleted successfully!` });
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Products.updateById(
    req.params.id,
    new Products(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found product with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating product with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.uploadImage = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  if(!req.files) {
    res.status(400).send({
        status: false,
        message: 'No file uploaded'
    });
  } else {
    let image = {
      file: req.files.file
    }
    Products.uploadImage(image, (err, data) => {
      if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the image."
      });
     else res.send(data);
    })
  }
}