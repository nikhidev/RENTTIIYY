import express from "express"
import multer from "multer";
import { authMiddleware } from "../middleware/authmiddleware";
import { createProperty, getProperties, getProperty } from "../controllers/PropertyController";
import { getLeasesByProperty } from "../controllers/leaseController";


const router = express.Router()
const storage = multer.memoryStorage();
const upload = multer({storage:storage});


router.get("/",getProperties);
router.get("/:id",getProperty);
router.get("/:propertyId/leases",authMiddleware(["manager","tenant"]),getLeasesByProperty)
router.post("/",authMiddleware(["manager"]),upload.array("photos"),createProperty);






export default router;

