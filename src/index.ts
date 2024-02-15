import express, { json, Request, Response } from "express";
import { handleFaviconRequest } from "../middleware/handleFaviconRequest";
import { validation } from "../middleware/validation";
import { userSchema } from "../validation/user";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(json());

app.use(handleFaviconRequest);

app.get("/", (req: Request, res: Response) => {
  console.log("Request URL", req.url);
  res.status(200).json({
    message: "NodeJs Guide",
  });
});

app.get("/user", validation(userSchema), (req: Request, res: Response) => {
  res.status(200).json(req.body);
});

app.listen(PORT, () => console.log("SERVER STARTED"));

export default app;
