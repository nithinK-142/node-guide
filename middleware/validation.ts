import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "yup";

export const validation =
  (schema: ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try {
      await schema.validate(body);
      next();
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
