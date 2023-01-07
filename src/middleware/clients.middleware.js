import { clientSchema } from "../models/Clients.js";
import { connectionDB } from "../database/db.js";

export async function validSchemaClients(req,res,next){
    const client = req.body;
    const {error} = clientSchema.validate(cake, {abortEarly: false});
    if(error){
        const errors = error.details.map(detail => detail.message);
        return res.status(400).send({errors})
    }

    const clientExists = await connectionDB.query("SELECT * FROM clients WHERE name=$1",[client.name]);
    if(clientExists.rowCount !== 0){
        res.sendStatus(409);
    }
    res.locals.client = client;

    next();
.3
}