import express from "express"
import multer from "multer";
import { authMiddleware } from "../middleware/authmiddleware";
import { createProperty, getProperties, getProperty } from "../controllers/PropertyController";


const router = express.Router()
const storage = multer.memoryStorage();
const upload = multer({storage:storage});


router.get("/",getProperties);
router.get("/:id",getProperty);
router.get("/",authMiddleware(["manager"]),upload.array("photos"),createProperty);





export default router;

