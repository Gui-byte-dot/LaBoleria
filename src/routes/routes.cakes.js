import {Router} from 'express';
import {create} from "../controllers/cakes.controllers.js";
import { validSchemaCakes } from '../middleware/cakes.middleware.js';

const router = Router();

router.post('/cakes', validSchemaCakes, create);

export default router;