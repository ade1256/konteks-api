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

exports.getAll = (req, res) => {
  // const isEmptyFilters = Object.keys(req.query).length === 0

  let filters = {
    page: req.query.page === undefined ? 1 : req.query.page,
    keyword: req.query.keyword === undefined ? "" : req.query.keyword
  }
  Orders.getAll(filters, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while get the orders."
      });
    else res.send(data);
  });
}

exports.delete = (req, res) => {
  Orders.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found order with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete order with id " + req.params.id
        });
      }
    } else res.send({ message: `order was deleted successfully!` });
  });
};

exports.changeStatus = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Orders.changeStatus(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found order`
        });
      } else {
        res.status(500).send({
          message: "Error updating order"
        });
      }
    } else res.send(data);
  })
}

exports.changeResi = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Orders.changeResi(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found order`
        });
      } else {
        res.status(500).send({
          message: "Error updating order"
        });
      }
    } else res.send(data);
  })
}

exports.getById = (req, res) => {
  Orders.getById(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while get the Products."
      });
    else res.send(data);
  });
}