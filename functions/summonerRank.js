const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const { summonerId } = event.queryStringParameters;
    const API_KEY = "RGAPI-0e528f30-5820-4b58-9350-8e61ab28ee0e";

    const url = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`;

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