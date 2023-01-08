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



export async function findClientId(req,res){
    const {id} = req.params;
    try{
        const getAllClientsId = await connectionDB.query(`
        SELECT 
            clients.id AS "clientId",
            clients.name AS "clientName",
            clients.address AS "clientAddress",
            clients.phone AS "clientPhone",
            cakes.id AS "cakeId",
            cakes.name AS "cakeName",
            cakes.price AS "cakePrice",
            cakes.description AS "cakeDescription",
            cakes.image AS "cakeImage",
            orders.id AS "orderId",
            orders."createdAt" AS "createdAt",
            orders.quantity AS "quantity",
            orders."totalPrice" AS "totalPrice"
        FROM 
            orders
        JOIN 
            clients 
        ON
            orders."clientId" = clients.id
        JOIN
            cakes
        ON 
            orders."cakeId" = cakes.id
        WHERE 
            clients.id=$1
        `,[id])
        const getAllClients = getAllClientsId.rows.map((ord) => ({
            orderId:ord.orderId,
            quantity:ord.quantity,
            createdAt:ord.createdAt,
            totalPrice:ord.totalPrice,
            cakeName:ord.cakeName

        }))
            
        if(getAllClientsId.rowCount === 0){
            return res.sendStatus(404);
        }

        res.send(getAllClients).status(200);

    }catch(err){
        return res.sendStatus(500)
    }
}

