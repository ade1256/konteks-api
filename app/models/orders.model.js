const sql = require("./db.js");
const moment = require("moment");

// constructor
const Orders = function (order) {
  this.productId = order.productId;
  this.variantId = order.variantId;
  this.customerName = order.customerName;
  this.customerPhone = order.customerPhone;
  this.customerCity = order.customerCity;
  this.customerAddress = order.customerAddress;
  this.quantity = order.quantity;
};

const getPriceAfterDiscountAndQuantity = (price, discount, quantity) => {
  let total = 0
  total = (price*((100-discount)/100))*quantity
  return total
}

Orders.create = (newOrder, result) => {
  sql.query(`SELECT * from orders`, (errOrders, ordersAll) => {
    const codeUnique = `K${ordersAll.length+6}${ordersAll.length+13}KPI${ordersAll.length+1}${ordersAll.length}`
    sql.query(`SELECT * from products WHERE id = ${newOrder.productId}`, (errProduct, product) => {
      const jsonVariant = JSON.parse(product[0].variants)
      const variantPrice = jsonVariant.filter(x => x.id === newOrder.variantId)[0].price
      const variantDiscount = jsonVariant.filter(x => x.id === newOrder.variantId)[0].discount
      const price = getPriceAfterDiscountAndQuantity(variantPrice, variantDiscount, newOrder.quantity)
      
      sql.query(
        "INSERT INTO orders SET ?",
        {
          id: codeUnique,
          ...newOrder,
          price: price,
          noResi: '',
          status: 'waiting',
          paymentProof: '',
          createdAt: moment().format(),
          updatedAt: moment().format(),
        },
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
  
          console.log("created order: ",  {
            id: codeUnique,
            ...newOrder,
            price: price,
            noResi: '',
            status: 'waiting',
            paymentProof: '',
            createdAt: moment().format(),
            updatedAt: moment().format(),
          });
          result(null,  {
            id: codeUnique,
            ...newOrder,
            price: price,
            noResi: '',
            status: 'waiting',
            paymentProof: '',
            createdAt: moment().format(),
            updatedAt: moment().format(),
          });
        }
      );
    })
  })
  
};

module.exports = Orders;
