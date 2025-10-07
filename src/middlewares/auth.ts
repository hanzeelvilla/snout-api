import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import jwt, { JwtPayload } from "jsonwebtoken";

const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(8).max(30).regex(/(?=.*[A-Z])(?=.*[0-9])(?=.*[!$#&@%_-])/).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

export function singUpValidation(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = signUpSchema.validate(req.body);

  if (error) {
    res.status(400).json({
      message: "Validation error",
      error: error.details[0].message,
    });

    return;
  }

  next();
}

export function loginValidation(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const loginSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(8).max(30).required(),
  });

  const { error } = loginSchema.validate(req.body);

  if (error) {
    res.status(400).json({
      message: "Validation error",
      error: error.details[0].message,
    });

    return;
  }

  next();
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
    });

    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      res.status(401).json({
        message: "Unauthorized",
      });

      return;
    }

    req.user = decoded;
    next();
  });
}

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}
