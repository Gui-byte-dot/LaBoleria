import { orderSchema } from "../models/Orders.js";
import { connectionDB } from "../database/db.js";
import dayjs from "dayjs";

export async function validSchemaOrders(req,res,next){
    const {clientId, cakeId, quantity}= req.body;

    try{  
        
        
       const idClientExists = await connectionDB.query("SELECT * FROM clients WHERE id=$1",[clientId]);
       if(idClientExists.rowCount === 0){
           return res.sendStatus(404);
       }
       const idCakeExists = await connectionDB.query("SELECT * FROM cakes WHERE id=$1",[cakeId]);
       if(idCakeExists.rowCount === 0){
           return res.sendStatus(404);
       }
       const order = {
        clientId,
        cakeId,
        createdAt:dayjs().format('YYYY-MM-DD HH:mm:ss'),
        quantity,
        totalPrice: quantity * idCakeExists.rows[0].price,
        }

        const {error} = orderSchema.validate(order, {abortEarly: false});
        if(error){
            const errors = error.details.map(detail => detail.message);
            return res.status(400).send({errors})
        }
    
        res.locals.order = order;
    
        next();
    }catch(err){
        res.status(500).send(err.message);
    }
    

}