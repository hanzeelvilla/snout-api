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
        return res.status(500).json({
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

        // Validate the date 
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
        return res.status(500).json({
            message: "Error creating reminder",
            err
        });
    }
}

export async function updateReminder(req: Request, res: Response) {
    try {
        const { id: reminderId } = req.params;
        const { id: userId } = req.user as JwtPayload;
        const { title, description, dueDate } = req.body;

        if(!title || !description || !dueDate)
            return res.status(400).json({message: "Missing required fields"});

        // Validate if the reminder exists and if it's from the same user
        // It could be better though
        const existingReminder = await prisma.reminder.findUnique({
            where: { id: reminderId, userId }
        });
        
        if(!existingReminder)
           return res.status(404).json({message: "Reminder not found"});

        const updatedReminder = await prisma.reminder.update({
            where: {id: reminderId, userId},
            data: {
                title,
                description,
                dueDate
            }
        })
        
        return res.status(200).json(updatedReminder);

    }
    catch(err) {
        return res.status(500).json({
            message: "Error updating reminder",
            err
        });
    }
}

export async function deleteReminder(req: Request, res: Response) {
    try {
        const { id: reminderId } = req.params;
        const { id: userId } = req.user as JwtPayload;

        // It could be better though
        const existingReminder = await prisma.reminder.findUnique({
            where: { id: reminderId, userId }
        });
        
        if(!existingReminder)
            return res.status(404).json({message: "Reminder not found"});

        await prisma.reminder.delete({
            where: {id: reminderId, userId}
        })

        return res.status(204).end();
    }
    catch(err) {
        return res.status(500).json({
            message: "Error deleting reminder",
            err
        });
    }
}