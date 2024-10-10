import { Request, Response } from "express";
import { coins } from "../utils/constants";
import Crypto from "../model/crypto.model";
import fetchCryptoData from "../jobs/crypto.job";
import { calculateStandardDeviation } from "../utils/util";

export const getStats = async (req: Request, res: Response) => {
  const { coin } = req.query;

  try {
    let cryptoData = await Crypto.find({
      name: { $regex: new RegExp(coin as string, "i") },
    })
      .sort({ updatedAt: -1 })
      .limit(1)
      .exec();

    if (!cryptoData) {
      await fetchCryptoData();
      cryptoData = await Crypto.find({
        name: { $regex: new RegExp(coin as string, "i") },
      })
        .sort({ updatedAt: -1 })
        .limit(1)
        .exec();
    }

    // Send the required data in the response
    res.json({
      price: cryptoData[0]!.price,
      marketCap: cryptoData[0]!.marketCap,
      "24hChange": cryptoData[0]!["24hchange"],
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching cryptocurrency data." });
  }
};

export const getDeviation = async (req: Request, res: Response) => {
  const { coin } = req.query;

  try {
    // Fetch the last 100 records for the requested coin, sorted by latest.
    let cryptoData = await Crypto.find({
      name: { $regex: new RegExp(coin as string, "i") },
    })
      .sort({ updatedAt: -1 })
      .limit(100)
      .exec();

    // Check if there are enough records
    if (cryptoData.length === 0) {
      await fetchCryptoData();
      cryptoData = await Crypto.find({
        name: { $regex: new RegExp(coin as string, "i") },
      })
        .sort({ updatedAt: -1 })
        .limit(100)
        .exec();
    }

    // Extract prices from the records
    const prices = cryptoData.map((record) => record.price);

    // Calculate standard deviation
    const deviation = calculateStandardDeviation(prices);

    // Return the deviation
    res.json({ deviation: deviation.toFixed(2) });
  } catch (error) {
    res.status(500).json({ error: "Error calculating standard deviation." });
  }
};
