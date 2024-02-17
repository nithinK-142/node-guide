import express, { json, Request, Response } from "express";
import { handleFaviconRequest } from "../middleware/handleFaviconRequest";
import { fetchShows } from "./mediaHelper";

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

app.get("/shows", async (_req: Request, res: Response) => {
  try {
    const shows = await fetchShows();
    res.json(shows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log("SERVER STARTED"));

export default app;
