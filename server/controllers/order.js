// Load input validation
const validateOrderInput = require("./../validation/order");
const OrderService = require("./../service/Order");

module.exports={
    order: (req, res) => {
        // Form validation
        console.log("req.body ",req.body.orders)
        let orders=JSON.parse(req.body.orders);

        const { errors, isValid } = validateOrderInput(orders);
        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        OrderService.order(orders).then(orders=>{
            return res.json(orders)
        }).catch(error=>{
            return res.status(400).json(error)
        })
    }
}