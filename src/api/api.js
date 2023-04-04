import { BASE_URL } from '../constants';

const checkResponse = async (res) => {
  if (res.ok) {
    console.log(
      `URL: ${res.url}
      Status: ${res.statusText}
      Status code: ${res.status}`
    );
    return await res.json();
  } else {
    throw new Error(`Error: ${res.status}`);
  }
};

export const getAllCoins = async () => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await checkResponse(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMarketHistoryData = async (coinId, days) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return await checkResponse(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getQueryCoins = async (query) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${query}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return await checkResponse(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getQueryCoinsInfo = async (query) => {
  const queryURI = encodeURI(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${query}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
  );
  try {
    const response = await fetch(queryURI, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await checkResponse(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
