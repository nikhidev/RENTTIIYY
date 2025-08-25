import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";

const prisma = new PrismaClient();

export const getTenant = async (req: Request, res: Response) => {
  try {
    const { cognitoId } = req.params;

    const tenant = await prisma.tenant.findUnique({
      where: { cognitoId },
      include: {
        favorites: true,
      },
    });
    if (tenant) {
      res.json(tenant);
    } else {
      res.status(404).json({ message: "Tenant not found" });
    }
  } catch (error) {
    console.error("Error fetching tenant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const createTenant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, name, email, phoneNumber } = req.body;
    const tenant = await prisma.tenant.create({
      data: {
        cognitoId,
        name,
        email,
        phoneNumber,
      },
    });
    res.status(201).json(tenant);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const updateTenant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const { name, email, phoneNumber } = req.body;

    const updateTenant = await prisma.tenant.update({
      where: { cognitoId },
      data: {
        name,
        email,
        phoneNumber,
      },
    });
    res.json(updateTenant);
  } catch (error: any) {
    res.status(500).json({ message: `Error updating tenant:${error.message}` });
  }
};
export const getCurrentResidence = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;

    const properties = await prisma.property.findMany({
      where: {
        tenants: { some: { cognitoId } },
      },
      include: {
        location: true,
      },
    });

    const residencesWithFormattedLocation = await Promise.all(
      properties.map(async (property) => {
        const coordinates: { coordinates: string }[] =
          await prisma.$queryRaw`
            SELECT ST_AsText(coordinates) as coordinates
            FROM "Location"
            WHERE id = ${property.location.id}
          `;

        const geoJSON: any = wktToGeoJSON(coordinates[0]?.coordinates || "");
        const longitude = geoJSON.coordinates[0];
        const latitude = geoJSON.coordinates[1];

        return {
          ...property,
          location: {
            ...property.location,
            coordinates: {
              longitude,
              latitude,
            },
          },
        };
      })
    );

    res.json(residencesWithFormattedLocation);
  } catch (err: any) {
    res.status(500).json({
      message: `Error retrieving tenant residences: ${err.message}`,
    });
  }
};

export const addFavoriteProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, propertyId } = req.params;
    const tenant = await prisma.tenant.findUnique({
      where: { cognitoId },
      include: { favorites: true },
    });
    if (!tenant) {
      res.status(404).json({ message: "Tenants not found" });
      return;
    }
    const propertyNumber = Number(propertyId);
    const existingFavorites = tenant.favorites || [];

    if (existingFavorites) {
      const updateTenant = await prisma.tenant.update({
        where: { cognitoId },
        data: {
          favorites: {
            connect: { id: propertyNumber },
          },
        },
        include: { favorites: true },
      });
      res.json(updateTenant);
    }
  } catch (error: any) {
    res.status(500).json(`eroor adding favorite property : ${error.messag}`);
  }
};
export const removeFavoriteProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, propertyId } = req.params;
    const propertyNumber = Number(propertyId);
    const updateTenant = await prisma.tenant.update({
      where: { cognitoId },
      data: {
        favorites: {
          disconnect: { id: propertyNumber },
        },
      },
      include: { favorites: true },
    });
    res.json(updateTenant);
  } catch (error: any) {
    res.status(500).json(`eroor adding favorite property : ${error.messag}`);
  }
};
