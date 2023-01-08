import {Router} from 'express';
import {create, findClientId} from "../controllers/clients.controllers.js";
import { validSchemaClients } from '../middleware/clients.middleware.js';

const router = Router();

router.post('/clients', validSchemaClients, create);
router.get('/clients/:id/orders',findClientId)

export default router;