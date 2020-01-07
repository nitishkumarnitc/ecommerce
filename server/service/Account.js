const Order=require('./../models/Order');
const log=require('./../logger');
module.exports={
    doOrders:(orders,email)=>{
        return new Promise((resolve,reject)=>{
            let order=new Order({
                order:orders,
                email:email
            })

            order.save().then(order=>{
                log.info("order created : "+order)
                resolve(order)
            }).catch(e=>{
                log.error("error in creating the order :  ",order, e)
                reject(e)
            })

        })
    }
}

