const sql = require("./db.js");
const moment = require("moment");

// constructor
const Orders = function (order) {
  this.products = order.products;
  this.customerName = order.customerName;
  this.customerPhone = order.customerPhone;
  this.customerCity = order.customerCity;
  this.customerSubdistrict = order.customerSubdistrict;
  this.customerSubdistrictId = order.customerSubdistrictId;
  this.customerAddress = order.customerAddress;
  this.customerNote = order.customerNote;
  this.courier = order.courier;
  this.paymentBankId = order.paymentBankId;
  this.cost = order.cost;
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
  let total = newOrder.cost
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
    delete body.cost
    
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

Orders.getAll = async (filter, result) => {
  let offset = (filter.page*10)-10
  const queryGetAll = `SELECT * FROM orders LIMIT 10 OFFSET ${offset}`
  if(filter.keyword !== "") {
    sql.query(`SELECT * FROM orders WHERE LOWER(id) LIKE '%${filter.keyword}%'`, (err, resKeyword) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      let parseJson = []
      resKeyword.map(order => {
        parseJson.push({
          ...order
        })
        return ''
      })
      result(null, {
        success: true,
        data: parseJson,
        currentPage: filter.page,
        total: parseJson.length,
        totalPage: 1
      })
    })
  } else {
    sql.query(`SELECT COUNT(*) FROM orders`, (errTotalRecord, resTotalRecord) => {
      sql.query(queryGetAll, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        let parseJson = []
        res.map(order => {
          parseJson.push({
            ...order
          })
          return ''
        })
        result(null, {
          success: true,
          data: parseJson,
          currentPage: filter.page,
          total: parseJson.length,
          totalPage: Math.floor((resTotalRecord[0]["COUNT(*)"] + 10-1)/10)
        })
      })
    })
  }
}

Orders.remove = (id, result) => {
  sql.query("DELETE FROM orders WHERE id = ?", id, (err, res) => {
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

Orders.changeStatus = (body, result) => {
  sql.query(`UPDATE orders SET status = ? WHERE id = ?`,
  [
    body.status,
    body.id
  ],(err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ success: false, kind: "not_found" }, null);
      return;
    }

    result(null, { success: true, ...body });
  })
}
Orders.changeResi = (body, result) => {
  sql.query(`UPDATE orders SET noResi = ? WHERE id = ?`,
  [
    body.noResi,
    body.id
  ],(err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ success: false, kind: "not_found" }, null);
      return;
    }

    result(null, { success: true, ...body });
  })
}

Orders.getById = (id, result) => {
  const queryGet = `SELECT * FROM orders WHERE id = '${id}'`
  sql.query(queryGet, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    let parseJson = {}
    res.map(order => {
      parseJson = {
        ...order,
      }
      return ''
    })
    result(null, parseJson)
  })
}

module.exports = Orders;
