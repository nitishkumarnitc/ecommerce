const Inventory=require('./../models/Inventory');
const Order=require('./../models/Order');
module.exports={
    order:(orders)=>{
        //transaction unit , check inventory , update inventory and update orders
        return new Promise(async (resolve,reject)=>{

            const session = await Inventory.startSession();
            session.startTransaction();

            try{
                let itemIds=[];
                orders.forEach(order=>{
                    itemIds.push(order.itemId)
                })
                
                const inventories= await Inventory.getInventory(itemIds);
                
                let bulkUpdateInventoryData=[];
                
                //check if items are available and throw error if inventory is not available
                orders.forEach(order=>{
                    inventories.forEach(async inventory=>{
                        if(inventory.itemId===order.itemId){
                            if(inventory.quantity<order.quantity){
                                //
                                //item out of stock
                                await session.abortTransaction();
                                session.endSession();
                                reject("Item id "+order.itemId+ " is not available");
                            }else{
                                bulkUpdateInventoryData.push({itemId:order.itemId,quantity:inventory.quantity-order.quantity})
                            }
                        }
                    })
                })

                const updatedInventory=await Inventory.updateInventory(bulkUpdateInventoryData);

                const doOrder=await Order.doOrders(orders);

                await session.commitTransaction();
                session.endSession();
                resolve(orders)

            }catch (e) {
                await session.abortTransaction();
                session.endSession();
                reject(e)
            }


        })
    }

}