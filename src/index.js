import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cakesRoutes from './routes/routes.cakes.js';


const app = express();
app.use(express.json());
app.use(cors());
app.use(cakesRoutes);

//Routes

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server running at port ${PORT}`));