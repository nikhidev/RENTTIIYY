import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgon from 'morgan';
import { authMiddleware } from './middleware/authmiddleware';
import tenantRoutes from './routes/tenantRoutes';
import managerRoutes from './routes/ManagerRoutes';
import propertyRoutes from './routes/propertiesRoutes'
import leaseRoutes from "./routes/leaseRoutes"
import applicationRoutes from "./routes/applicationRoutes"


//Configurations

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgon("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())


// Routes

app.get("/",(req,res)=>{
    res.send("This is home route")
});
app.use("/tenants",authMiddleware(["tenant"]),tenantRoutes);

app.use("/managers",authMiddleware(["manager"]),managerRoutes);

app.use("/properties",propertyRoutes)

app.use("/leases",leaseRoutes)

app.use("/applications",applicationRoutes)
// server

const port = process.env.PORT || 3002
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

