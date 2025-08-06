import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

export const getManager = async (req: Request, res: Response) => {
    try{
        const { cognitoId } = req.params;
        // Logic to fetch tenant details using cognitoId
        // For example, using a database query
        const Manager = await prisma.tenant.findUnique({
            where: { cognitoId },
            include: {
                favorites: true,
            }
        });
        if(Manager){
            res.json(Manager)
        }else{
            res.status(404).json({message: "Manager not found"});
        }
    }
    catch(error){
        console.error("Error fetching Manager:", error);
        res.status(500).json({error: "Internal server error"});
    }
}
export const createManager = async(req: Request, res: Response):Promise<void> => {
    try{
        const {cognitoId , name , email, phoneNumber} = req.body;
         const Manager = await prisma.tenant.create({
            data: {
                cognitoId,
                name,
                email,
                phoneNumber,
            }
         })
         res.status(201).json(Manager);

    }catch(error){
        res.status(500).json({error: "Internal server error"});
    }

}