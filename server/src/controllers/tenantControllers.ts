import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

export const getTenant = async (req: Request, res: Response) => {
    try{
        const { cognitoId } = req.params;
        // Logic to fetch tenant details using cognitoId
        // For example, using a database query
        const tenant = await prisma.tenant.findUnique({
            where: { cognitoId },
            include: {
                favorites: true,
            }
        });
        if(tenant){
            res.json(tenant)
        }else{
            res.status(404).json({message: "Tenant not found"});
        }
    }
    catch(error){
        console.error("Error fetching tenant:", error);
        res.status(500).json({error: "Internal server error"});
    }
}
export const createTenant = async(req: Request, res: Response):Promise<void> => {
    try{
        const {cognitoId , name , email, phoneNumber} = req.body;
         const tenant = await prisma.tenant.create({
            data: {
                cognitoId,
                name,
                email,
                phoneNumber,
            }
         })
         res.status(201).json(tenant);

    }catch(error){
        res.status(500).json({error: "Internal server error"});
    }

}