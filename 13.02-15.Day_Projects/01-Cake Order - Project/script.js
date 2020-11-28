"use strict";

let patisserie = {
  bananaCaramel: {
    stock: 3,
    price: 9.99,
  },
  contessa: {
    stock: 5,
    price: 7.99,
  },
  concorde: {
    stock: 11,
    price: 22.99,
  },
  mouseCake: {
    stock: 8,
    price: 16.99,
  },
  confettiSuprise: {
    stock: 9,
    price: 14.99,
  },
};

const cakeType = document.getElementById('cakeSelect');
const orderAmount = document.getElementById('cakeAmount');
const orderBtn = document.getElementById('submit_btn');


const checkOrder = (order) => {
  return new Promise((resolve, reject) => {
    let inStock = patisserie[order[0]].stock;
    let inprice = patisserie[order[0]].price;
    let total = 0
    setTimeout(() => {
      if (inStock < order[1]) {
        reject(`There are not enough products in stock.\nThere are ${inStock} items in stock`)
      } else {
        total = order[1] * inprice;
        resolve([order, total]);
      }
    }, 1000);
  });
};

const payment = (resolvedValueArray) => {
  const order = resolvedValueArray[0];
  const total = resolvedValueArray[1];
  let inStock = patisserie[order[0]].stock;
  let lastStock = inStock - order[1];
  return new Promise((resolve, reject) => {
    console.log(`Your order total : $${total}\nPress '1' to complete your order.\nPress '2' to cancel your order`);
    setTimeout(() => {
      document.onkeypress = function (e) {
        if (e.key == 1) {
          patisserie[order[0]].stock = lastStock;
          console.log(`Your order is complete thanks.\nYour order : ${order[1]} ${order[0]}.\n$${total} charged.`);
          resolve(order);
        } else if (e.key == 2) {
          reject('Your order has been canceled. Thank you for choosing us.');
        }
      }
    }, 1000);
  });
}

const stockControl = (resolvedValueArray) => {
  const inStock = patisserie[resolvedValueArray[0]].stock;
  const order = resolvedValueArray[1];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (inStock > 1) {
        resolve(`There are ${inStock} items left in your stock.`)
      } else {
        reject(`ATTENTION\nStock is at critical level.(${inStock}).`)
      }
    }, 1000);
  });
}


// Button make order
orderBtn.onclick = () => {

  let cakeTypee = cakeType.value;
  let orderAmountt = orderAmount.value;
  let order = [cakeTypee, orderAmountt];   // sample order template

  checkOrder(order).then((resolvedValueArray) => {
    return payment(resolvedValueArray);
  }).then((resolvedValue) => {
    return stockControl(resolvedValue);
  }).then((resolvedValue) => {
    console.log(resolvedValue);
  }).catch((rejectedValue) => {
    console.log(rejectedValue)
  });

}