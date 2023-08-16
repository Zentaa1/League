const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const { summonerId, server } = event.queryStringParameters;
    const API_KEY = process.env.API_KEY;

    const sumRankUrl = `https://${server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`;

    const sumRankResponse = await axios.get(sumRankUrl);
    const sumRankData = sumRankResponse.data;

    return {
      statusCode: 200,
      body: JSON.stringify(sumRankData),
    };
  } catch (error) {
    console.error('Failed to fetch API:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch API' }),
    };
  }
};