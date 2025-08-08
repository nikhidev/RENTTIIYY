import express from "express"
import { authMiddleware } from "../middleware/authmiddleware";
import { getLeasePayment, getLeases } from "../controllers/leaseController";

const router  = express.Router();

router.get("/",authMiddleware(["manager","tenant"]),getLeases)
router.get("/:id/payments",authMiddleware(["manager","tenant"]),getLeasePayment)

export default router;