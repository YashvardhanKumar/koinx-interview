import { Router, Request, Response } from "express";
import fetchCryptoData from "../jobs/crypto.job";
import Crypto from "../model/crypto.model";
import { coins } from "../utils/constants";
import { getDeviation, getStats } from "../services";
import { checkQuery } from "../middleware/checkQuery";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const data = await Crypto.find().sort({ updatedAt: -1 }).select("-__v -_id");
  res.json(data);
});

router.get("/stats",checkQuery,getStats);
router.get("/deviation",checkQuery,getDeviation);
export default router;