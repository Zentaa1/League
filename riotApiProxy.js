const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const { name } = event.queryStringParameters;
    const API_KEY = process.env.API_KEY;; // Replace with your Riot Games API key

    const url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`;

    const response = await axios.get(url);
    const data = response.data;

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Failed to fetch API:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch API' }),
    };
  }
};