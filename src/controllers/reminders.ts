import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function getReminders(req: Request, res: Response) {
    try {
        const { id:  userId} = req.user as JwtPayload;

        const reminders = await prisma.reminder.findMany({
            where: { userId }
        })

        res.status(200).json(reminders);
    }
    catch(err) {
        res.status(500).json({
            message: "Error fetching reminders",
            err
        });
    }
}