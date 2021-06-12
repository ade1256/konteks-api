const sql = require("./db.js");

const Payment = function (payment) {
  this.orderId = payment.orderId;
  this.files = payment.files;
};

Payment.uploadPayment = async (payment, result) => {
  const fileProof = payment.file;
  await fileProof.mv("./uploads/" + fileProof.name);
  const queryUpdateOrder = `UPDATE orders SET status='review', paymentProof='/uploads/${fileProof.name}' WHERE id="${payment.orderId}"`
  await sql.query(queryUpdateOrder, async (errOrder, order) => {
    if(errOrder) {
      result(errOrder, null)
    }

    result(null, {
      status: true,
      message: "Successfully upload payment"
    })
  })
};

module.exports = Payment;
