import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(8).max(30).required(),
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
