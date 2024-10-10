export const calculateStandardDeviation = (prices: number[]): number => {
    const mean = prices.reduce((acc, val) => acc + val, 0) / prices.length;
    const variance =
      prices.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
      prices.length;
    return Math.sqrt(variance);
  };