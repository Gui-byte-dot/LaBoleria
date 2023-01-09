import dayjs from "dayjs";
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
export async function findAllOrders(req,res){
    const { date } = req.query;

    if(date){
        try{
        
            const getAllOrders = await connectionDB.query(`
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
                TO_CHAR(orders."createdAt",'YYYY-MM-DD HH24:MI:SS') AS "createdAt",
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
                orders."createdAt"::date = $1
    
    
            `,[`${date}`]);
            const allOrders = getAllOrders.rows.map((ord) => ({
                client:{
                    id:ord.clientId,
                    name: ord.clientName,
                    address:ord.clientAddress,
                    phone:ord.clientPhone
                },
                cake: {
                    id:ord.cakeId,
                    name:ord.cakeName,
                    price:ord.cakePrice,
                    description:ord.cakeDescription,
                    image:ord.cakeImage
                },
                orderId:ord.orderId,
                createdAt:ord.createdAt,
                quantity:ord.quantity,
                totalPrice:ord.totalPrice
            }))
                
            if(getAllOrders.rowCount === 0){
                return res.send([]).status(404);
            }
            
            res.send(allOrders).status(200);
        }catch(err){
            return res.sendStatus(500)
        }
    } else {
        try{
        
            const getAllOrders = await connectionDB.query(`
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
                TO_CHAR(orders."createdAt",'YYYY-MM-DD HH24:MI:SS') AS "createdAt",
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
           
    
    
            `);
            const allOrders = getAllOrders.rows.map((ord) => ({
                client:{
                    id:ord.clientId,
                    name: ord.clientName,
                    address:ord.clientAddress,
                    phone:ord.clientPhone
                },
                cake: {
                    id:ord.cakeId,
                    name:ord.cakeName,
                    price:ord.cakePrice,
                    description:ord.cakeDescription,
                    image:ord.cakeImage
                },
                orderId:ord.orderId,
                createdAt:ord.createdAt,
                quantity:ord.quantity,
                totalPrice:ord.totalPrice
            }))
                
            if(getAllOrders.rowCount === 0){
                return res.send([]).status(404);
            }
            
            res.send(allOrders).status(200);
            console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'));
        }catch(err){
            return res.sendStatus(500)
        }
    }
}

export async function findOrderId(req,res){
    const {id} = req.params;
    try{
        const getAllOrdersId = await connectionDB.query(`
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
            TO_CHAR(orders."createdAt",'YYYY-MM-DD HH24:MI:SS') AS "createdAt",
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
            orders.id=$1
        `,[id])
        const allOrdersId = getAllOrdersId.rows.map((ord) => ({
            client:{
                id:ord.clientId,
                name: ord.clientName,
                address:ord.clientAddress,
                phone:ord.clientPhone
            },
            cake: {
                id:ord.cakeId,
                name:ord.cakeName,
                price:ord.cakePrice,
                description:ord.cakeDescription,
                image:ord.cakeImage
            },
            orderId:ord.orderId,
            createdAt:ord.createdAt.replace('.000Z',''),
            quantity:ord.quantity,
            totalPrice:ord.totalPrice
        }))
            
        if(getAllOrdersId.rowCount === 0){
            return res.sendStatus(404);
        }

        res.send(allOrdersId).status(200);

    }catch(err){
        return res.sendStatus(500)
    }
}

