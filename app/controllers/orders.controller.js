const Orders = require("../models/orders.model")

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const order = new Orders({
    products: req.body.products,
    customerName: req.body.customerName,
    customerPhone: req.body.customerPhone,
    customerCity: req.body.customerCity,
    customerSubdistrict: req.body.customerSubdistrict,
    customerAddress: req.body.customerAddress,
    customerNote: req.body.customerNote,
    courier: req.body.courier,
    paymentBankId: req.body.paymentBankId
  });

  Orders.create(order, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Orders."
      });
    else res.send(data);
  });
};