import { Router, type Request, type Response } from "express";
import axios from "axios";

const router = Router();

interface Branch {
  branchName: string;
  vercelLink: string | null;
}

interface MappedBranch {
  branchName: string;
  apiLink: string | null;
}

router.get("/", async (_req: Request, res: Response) => {
  try {
    const apiResponse = await axios.get<Branch[]>(
      process.env.BRANCH_SENTINEL_URL!
    );

    const branches: MappedBranch[] = apiResponse.data.map((item: Branch) => ({
      branchName: `https://github.com/nithinK-142/node-guide/tree/${item.branchName}`,
      apiLink: item.vercelLink
        ? `https://node-guide-git-${item.vercelLink}-nithink142s-projects.vercel.app`
        : "deployment not available!",
    }));

    return res.status(200).json({
      message: "NodeJs Guide",
      description: "Refer github for api usage info.",
      branches: branches,
    });
  } catch (error) {
    console.error("Error fetching branch data:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch guide info, please try again later" });
  }
});

export { router as BranchListRouter };
