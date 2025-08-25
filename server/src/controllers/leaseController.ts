import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

export const getLeases = async (req: Request, res: Response) => {
    try{
        const leases = await prisma.lease.findMany({
            include:{
                tenant:true,
                property:true,
            }
        })
        res.json(leases)
    }
    catch(error:any){
     
        res.status(500).json({message: `Error retraving leases : ${error.message}`});
    }
}
export const getLeasePayment = async(req: Request, res: Response):Promise<void> => {
    try{
      const {id} = req.params;
      const payment = await prisma.payment.findMany({
        where:{leaseId:Number(id)}
      })
         res.status(201).json(payment);

    }catch(error){
        res.status(500).json({error: "Error retriveing lease paymets"});
    }

}
export const getLeasesByProperty = async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;
    const leases = await prisma.lease.findMany({
      where: { propertyId: Number(propertyId) },
      include: {
        tenant: true,  // <-- this is needed for tenant info
      },
    });
    res.json(leases);
  } catch (err: any) {
    console.error("Error fetching leases by property:", err);
    res.status(500).json({ error: err.message });
  }
};
