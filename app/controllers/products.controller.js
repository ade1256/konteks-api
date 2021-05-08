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
    variants: req.body.variants
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