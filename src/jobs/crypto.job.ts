import axios from "axios";
import cron from "node-cron";
import Crypto from "../model/crypto.model";

const fetchCryptoData = async () => {
  try {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "bitcoin,ethereum,matic-network",
          vs_currencies: "usd",
          include_market_cap: "true",
          include_24hr_change: "true",
        },
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": process.env.GECKO_API_KEY,
        },
      }
    );

    const cryptos = [
      { name: "Bitcoin", id: "bitcoin" },
      { name: "Ethereum", id: "ethereum" },
      { name: "Matic", id: "matic-network" },
    ];

    cryptos.forEach(async (crypto) => {
      const cryptoData = data[crypto.id];

      const newCrypto = new Crypto({
        name: crypto.name,
        price: cryptoData.usd,
        marketCap: cryptoData.usd_market_cap,
        "24hchange": cryptoData.usd_24h_change,
        updatedAt: new Date(),
      });

      const d = await newCrypto.save();
    });

    console.log("Crypto data fetched and updated.");
  } catch (error) {
    console.error("Error fetching crypto data:", error);
  }
};

// Schedule the job to run every 2 hours
const crontask = cron.schedule("0 */2 * * *", fetchCryptoData);
crontask.start();
export default fetchCryptoData;
export { crontask };
