import express from 'express';
import { createManager, getManager } from '../controllers/managetController';
const router = express.Router();

router.get("/:congnitoId",getManager)
router.post("/",createManager)


export default router;