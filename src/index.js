import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cakesRoutes from './routes/routes.cakes.js';
import clientsRoutes from './routes/routes.clients.js';
import ordersRoutes from './routes/routes.orders.js';


const app = express();
app.use(express.json());
app.use(cors());
app.use(cakesRoutes);
app.use(clientsRoutes);
app.use(ordersRoutes);

//Routes

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server running at port ${PORT}`));