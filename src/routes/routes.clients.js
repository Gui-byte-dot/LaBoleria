import {Router} from 'express';
import {create} from "../controllers/clients.controllers.js";
import { validSchemaClients } from '../middleware/clients.middleware.js';

const router = Router();

router.post('/clients', validSchemaClients, create);

export default router;