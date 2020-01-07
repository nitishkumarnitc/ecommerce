const Validator = require("validator");
const isEmpty = require("is-empty");
const keys=["itemId","quantity"];

module.exports = function validateOrderInput(orders) {
  let errors={}

  orders.forEach(order=>{
      if(Validator.isEmpty((order.itemId).toString())){
        errors["itemId"]+=order.itemId +"Can't be empty";
      }
    if(order.quantity<=0){
      errors["quantity"]+="quantity ordered can't be negative for order "+order;
    }

  })


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
