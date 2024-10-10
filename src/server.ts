import app from './app';
import dotenv from 'dotenv';
import connectDB from './db';
import './jobs/crypto.job';
import fetchCryptoData from './jobs/crypto.job';

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB();
app.listen(PORT, async () => {
  await fetchCryptoData();
  console.log(`Server is running on port ${PORT}`);
});