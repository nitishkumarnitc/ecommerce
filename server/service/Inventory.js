const Inventory=require('./../models/Inventory');
const log=require('./../logger');
module.exports={
    getInventory:(itemIds)=>{
        return new Promise((resolve,reject)=>{
            let orQuery=[];
            itemIds.forEach(itemId=>{
                orQuery.push({'itemId':itemId})
            })

            Inventory.find({$or:orQuery}).then((result)=>{
                resolve(result);
            }).catch(err=>{
                log.error( err)
                reject(err)
            })

        })
    },
    updateInventory:(updatedInventory)=>{
        return new Promise((resolve,reject)=>{
            Inventory.bulkWrite(
                updatedInventory.map(inventory =>
                    ({
                        updateOne: {
                            filter: { itemId : inventory.itemId },
                            update: { $set: inventory },
                            upsert: true
                        }
                    })
                )).then(result=>{
                     result(result)
            }).catch(err=>{
                log.error(err);
                reject(err)
            })

        })
    }
}

