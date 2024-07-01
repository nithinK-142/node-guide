import express from "express";
import cors from "cors";
import "dotenv/config";
import { handleFaviconRequest } from "./middleware/favicon.middleware";
import { BranchListRouter } from "./branchList";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({ origin: "*", methods: ["GET"] }));

app.use(express.json());

app.use(handleFaviconRequest);
app.use(BranchListRouter);

app.listen(port, () => console.log(`⚙️ Server is Up and Running at ${port}`));

export default app;
