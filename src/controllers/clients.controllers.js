import { connectionDB } from "../database/db.js";
export async function create(req,res){
    const {name, address, phone } = res.locals.client;
    try{
        await connectionDB.query("INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3)",[name, address, phone]);
        res.sendStatus(201);
    }catch(err){
        res.status(500).send(err.message);
    }
}
