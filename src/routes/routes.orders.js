import {Router} from 'express';
import { findAllOrders } from '../controllers/orders.controllers.js';
import {create} from "../controllers/orders.controllers.js";
import { validSchemaOrders } from '../middleware/orders.middleware.js';

const router = Router();

router.post('/orders', validSchemaOrders, create);
router.get('/orders',findAllOrders)

export default router;