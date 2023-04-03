import { getAllCoins, getMarketHistoryData } from '../api/api';

export const useApi = (coinId) => {
  const handleAllCoins = () => getAllCoins();
  const handleMarketHistoryData = (coinId) => getMarketHistoryData(coinId);

  return {
    handleAllCoins,
    handleMarketHistoryData,
  };
};
