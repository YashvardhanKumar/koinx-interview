import express, { Application } from "express";
import dotenv from "dotenv";
import routes from "./routes";
import fetchCryptoData from "./jobs/crypto.job";

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", routes);

export default app;
