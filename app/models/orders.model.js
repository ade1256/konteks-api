const sql = require("./db.js");
const moment = require("moment");

// constructor
const Orders = function (order) {
  this.products = order.products;
  this.customerName = order.customerName;
  this.customerPhone = order.customerPhone;
  this.customerCity = order.customerCity;
  this.customerSubdistrict = order.customerSubdistrict;
  this.customerAddress = order.customerAddress;
  this.customerNote = order.customerNote;
  this.courier = order.courier;
  this.paymentBankId = order.paymentBankId
};

const getPriceAfterDiscountAndQuantity = async (price, discount, quantity) => {
  let total = 0
  total = (price*((100-discount)/100))*quantity
  return total
}

const getVariantsByProduct =  (products) => {
  let array = []
   products.map(async order => {
     sql.query(`SELECT * from products WHERE id = ${order.productId}`,  (errProduct, product) => {
      const variants = JSON.parse(product[0].variants)
      array.push({
        ...variants.filter(x => x.id === order.variantId)[0],
        quantity: order.quantity
      })
    })
  })
  
  return array
}

Orders.create = async (newOrder, result) => {
  let total = 0
  let getVariants = getVariantsByProduct(newOrder.products)
  await sql.query(`SELECT * from orders`, async (errOrders, ordersAll) => {
    const codeUnique = `K${ordersAll.length+6}${ordersAll.length+13}KPI${ordersAll.length+1}${ordersAll.length}`
    getVariants.map(item => {
      total = total+(item.price*((100-item.discount)/100))*item.quantity
    })
    let body = {
      id: codeUnique,
      ...newOrder,
      products: JSON.stringify(newOrder.products),
      price: total,
      noResi: '',
      status: 'waiting',
      paymentProof: '',
      createdAt: moment().format(),
      updatedAt: moment().format(),
    }
    
    await sql.query(
      "INSERT INTO orders SET ?",
      body,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("created order: ",  body);
        result(null,  body);
      }
    );
  })
  
};

module.exports = Orders;
