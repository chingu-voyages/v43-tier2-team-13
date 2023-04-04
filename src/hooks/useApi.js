import { getAllCoins, getMarketHistoryData } from '../api/api';

export const useApi = (coinId, days) => {
  const handleAllCoins = () => getAllCoins();
  const handleMarketHistoryData = (coinId, days) =>
    getMarketHistoryData(coinId, days);

  return {
    handleAllCoins,
    handleMarketHistoryData,
  };
};
