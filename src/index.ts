import express, { json, Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(json());

app.get("/", (req: Request, res: Response) => {
  console.log("Request URL", req.url);
  res.status(200).json({
    message: "NodeJs Guide",
  });
});

app.listen(PORT, () => console.log("SERVER STARTED"));

export default app;
