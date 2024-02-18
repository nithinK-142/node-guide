import { Request, Response, NextFunction } from "express";
import { z, ZodSchema } from "zod";
import { UserData } from "../validation/user";

export const validation =
  (schema: ZodSchema<UserData>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody;
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessages = err.issues.map((msg) => msg.message);
        console.log(errorMessages);
        return res.status(400).json({ errorMessages });
      }
    }
  };
