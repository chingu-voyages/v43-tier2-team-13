import { BASE_URL } from "../constants";

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
