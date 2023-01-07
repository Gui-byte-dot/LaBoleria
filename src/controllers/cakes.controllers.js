import { connectionDB } from "../database/db.js";
export async function create(req,res){
    const {name, price, description, image } = res.locals.cake;
    try{
        await connectionDB.query("INSERT INTO cakes (name, price, description, image) VALUES ($1, $2, $3, $4)",[name, price, description, image]);
        res.sendStatus(201);
    }catch(err){
        res.status(500).send(err.message);
    }
}
