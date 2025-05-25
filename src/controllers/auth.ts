import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function signUp(req: Request, res: Response) {
  const { name, lastName, email, username, password } = req.body;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or username already in use",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        lastName,
        email,
        username,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        lastName: newUser.lastName,
        email: newUser.email,
        username: newUser.username,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error,
    });
  }
}
