import { connectionDB } from "../database/db.js";
export async function create(req,res){
    const { clientId, cakeId, createdAt, quantity, totalPrice} = res.locals.order;
    try{
        await connectionDB.query(`INSERT INTO orders ("clientId", "cakeId", "createdAt", quantity, "totalPrice") VALUES ($1, $2, $3, $4, $5)`,[clientId, cakeId, createdAt, quantity, totalPrice]);
        res.sendStatus(201);
    }catch(err){
        res.status(500).send(err.message);
    }
}