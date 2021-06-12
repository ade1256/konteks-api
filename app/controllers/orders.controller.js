const Orders = require("../models/orders.model")
const Payment = require("../models/orderPayment.model");

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
    customerSubdistrictId: req.body.customerSubdistrictId,
    customerAddress: req.body.customerAddress,
    customerNote: req.body.customerNote,
    courier: req.body.courier,
    paymentBankId: req.body.paymentBankId,
    cost: req.body.cost
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

exports.uploadPayment = (req, res) => {
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
    let payment = {
      orderId: req.body.orderId,
      file: req.files.file
    }
    Payment.uploadPayment(payment, (err, data) => {
      if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Payment."
      });
     else res.send(data);
    })
  }
}