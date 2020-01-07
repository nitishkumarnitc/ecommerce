const InventoryModel=require('./../models/Inventory');
const InventoryService=require('./Inventory');
const Order=require('./../models/Order');
module.exports={
    order:(orders)=>{
        //transaction unit , check inventory , update inventory and update orders
        return new Promise(async (resolve,reject)=>{

            console.log("order receive ",orders)
            const session = await InventoryModel.startSession();
            session.startTransaction();

            try{
                let itemIds=[];
                orders.forEach(order=>{
                    itemIds.push(order.itemId)
                })

                console.log("itemIds build is ",itemIds)
                const inventories= await InventoryService.getInventory(itemIds);

                console.log("inventories ",inventories)
                let bulkUpdateInventoryData=[];
                
                //check if items are available and throw error if inventory is not available
                orders.forEach(order=>{
                    let itemFound=false;
                    inventories.forEach(async inventory=>{
                        if(inventory.itemId===order.itemId){
                            itemFound=true
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
                    if(!itemFound){
                         session.abortTransaction();
                        session.endSession();
                        reject("Item id "+order.itemId+ " is not available");
                    }

                })

                const updatedInventory=await InventoryService.updateInventory(bulkUpdateInventoryData);

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