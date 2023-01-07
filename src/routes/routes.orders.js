import {Router} from 'express';
import {create} from "../controllers/orders.controllers.js";
import { validSchemaOrders } from '../middleware/orders.middleware.js';

const router = Router();

router.post('/orders', validSchemaOrders, create);

export default router;