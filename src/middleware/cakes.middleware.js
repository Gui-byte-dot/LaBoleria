import { cakeSchema } from "../models/Cakes.js";
import { connectionDB } from "../database/db.js";

export async function validSchemaCakes(req,res,next){
    const cake = req.body;
    const {error} = cakeSchema.validate(cake, {abortEarly: false});
    if(error){
        if(error.details[0].message === `"image" must be a valid uri`){
            res.sendStatus(409);
        }

        const errors = error.details.map(detail => detail.message);
        return res.sendStatus(400);

        
    }

    const cakeExists = await connectionDB.query("SELECT * FROM cakes WHERE name=$1",[cake.name]);
    if(cakeExists.rowCount !== 0){
        res.sendStatus(409);
    }
   
    res.locals.cake = cake;

    next();

}