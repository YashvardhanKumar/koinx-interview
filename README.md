# KoinX Backend Assignment

This project is a Node.js backend application that fetches and processes cryptocurrency data using the CoinGecko API. It includes background jobs for data collection and APIs for statistical analysis.

[Deployed Link](https://koinx-interview.onrender.com/)

Since it is deployed on Render, it takes around 50 seconds to restart the server from inactivity as it is running on free instance.

## Features

- Background job to fetch cryptocurrency data every 2 hours
- API endpoints for retrieving latest crypto stats and price deviation
- Supports Bitcoin, Ethereum, and Matic cryptocurrencies
- Standard deviation calculation for price analysis

## Tech Stack

- Node.js
- MongoDB
- Express.js
- CoinGecko API

## API Endpoints

### 1. Get Latest Cryptocurrency Stats
```
GET /stats?coin=bitcoin
```
Query Parameters:
- `coin`: One of `bitcoin`, `ethereum`, or `matic-network`

Example Response:
```json
{
  "price":94998,
  "marketCap":1880325989743.4062,
  "24hChange":2.4450881684133368
}
```

### 2. Get Price Deviation
```
GET /deviation?coin=bitcoin
```
Query Parameters:
- `coin`: One of `bitcoin`, `ethereum`, or `matic-network`

Response:
```json
{
  "deviation": "8852.94"
}
```

## Setup and Installation

1. Clone the repository
```bash
git clone https://github.com/YashvardhanKumar/koinx-interview.git
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/koinx-interview #For local server
PORT=5050
```

4. Start the server
```bash
npm start
```

## Background Jobs

The application includes a background service that:
- Runs every 2 hours
- Fetches current price, market cap, and 24h change
- Stores data in MongoDB for each supported cryptocurrency

## Database Schema

The application uses MongoDB with a schema designed to efficiently store cryptocurrency data. Each record includes:
- Timestamp
- Price in USD
- Market Cap in USD
- 24-hour price change
- Cryptocurrency identifier

## Deployment

The application can be deployed using:
- MongoDB Atlas for database
- Render used for the backend server
