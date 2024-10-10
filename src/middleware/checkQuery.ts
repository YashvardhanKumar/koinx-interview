import { NextFunction, Request, Response } from "express";
import { coins } from "../utils/constants";
import fetchCryptoData from "../jobs/crypto.job";
import Crypto from "../model/crypto.model";

export const checkQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { coin } = req.query;

    if (!coin || !coins.includes(coin as string)) {
      res
        .status(400)
        .json({ error: "Invalid or missing coin query parameter." });
    }


    next();
  } catch (error) {
    throw error;
  }
};
