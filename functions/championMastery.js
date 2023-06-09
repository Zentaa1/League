const axios = require('axios');

exports.handler = async (event, context) => {
    try {
        const { encryptedId } = event.queryStringParameters;
        const API_KEY = process.env.API_KEY;

        const champMastUrl = `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${encryptedId}?api_key=${API_KEY}`;

        const champMastResponse = await axios.get(champMastUrl);
        const champMastData = champMastResponse.data;

        return {
            statusCode: 200,
            body: JSON.stringify(champMastData),
        };
    } catch (error) {
        console.error('Failed to fetch API:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch API'}),
        };
    }
};