import express, { json, Request, Response } from "express";
import cors from "cors";
import { handleFaviconRequest } from "./middleware/handleFaviconRequest";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(json());

app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  })
);

app.use(handleFaviconRequest);

app.get("/", async (_req: Request, res: Response) => {
  try {
    const apiResponse = await axios.get(
      "https://api-branch.vercel.app/node-guide?links=true"
    );

    const branches = apiResponse.data.map((item: any) => ({
      branch: item.branch,
      link: item.link,
    }));

    return res.status(200).json({
      message: "NodeJs Guide",
      branches: branches,
    });
  } catch (error) {
    console.error("Error making API call:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => console.log("SERVER STARTED"));

export default app;
