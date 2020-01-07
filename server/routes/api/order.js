const router =require("express").Router();
const OrderController=require('./../../controllers/order')

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("",OrderController.order);

module.exports = router;
