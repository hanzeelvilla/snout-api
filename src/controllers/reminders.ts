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

        return res.status(200).json(reminders);
    }
    catch(err) {
        res.status(500).json({
            message: "Error fetching reminders",
            err
        });
    }
}

export async function createReminder(req: Request, res: Response) {
    try {
        const { title, description, dueDate } = req.body;
        const { id: userId } = req.user as JwtPayload;

        if(!title || !description || !dueDate)
            return res.status(400).json({message: "Missing required fields"});

        const dueDateObj = new Date(dueDate);
        const now = new Date();
        console.log(now)

        // 
        if(dueDateObj < now)
            return res.status(400).json({message: "Due date cannot be in the past"});

        const reminder = await prisma.reminder.create({
            data: {
                title,
                description,
                dueDate: dueDateObj,
                userId
            }
        });

        return res.status(201).json(reminder);
    }
    catch(err) {
        res.status(500).json({
            message: "Error creating reminder",
            err
        })
    }
}