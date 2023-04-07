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

export const getCoinNews = async (query) => {
  console.log('query call');
  const NewsAPIKey = 'f85ec7de90de6894fff0948d90e4d585'
  try {
    const response = await fetch(
      encodeURI(`https://gnews.io/api/v4/search?q=${query}&lang=en&max=10&sortby=publishedAt&apikey=${NewsAPIKey}`),
      // encodeURI(`https://newsdata.io/api/1/news?apikey=pub_200511691fdbbc197cd0ed78d7c6876a07aed&q=${query} `)
    );
    return await checkResponse(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

