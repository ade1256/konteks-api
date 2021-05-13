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
    page: req.query.page === undefined ? 1 : req.query.page
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