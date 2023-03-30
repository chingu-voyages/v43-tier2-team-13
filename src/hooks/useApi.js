import { getAllCoins, getMarketHistoryData } from '../api/api';

export const useApi = () => {
  const handleAllCoins = () => getAllCoins();
  const handleMarketHistoryData = () => getMarketHistoryData();

  return {
    handleAllCoins,
    handleMarketHistoryData,
  };
};
