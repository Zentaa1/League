const express = require('express');
const cors = require('cors');
const app = express();
const https = require('https');

// Enable CORS
app.use(cors());

const port = 5500; // Change the port number if needed

app.use(express.json());

// Define an endpoint to handle the API request
app.get('/api/summoner/:name', (req, res) => {
  const { name } = req.params;
  const API_KEY = process.env.API_KEY; // Replace 'YOUR_API_KEY' with your actual API key

  const options = {
    hostname: 'euw1.api.riotgames.com',
    path: `/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`,
    method: 'GET',
  };

  const request = https.request(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    });
  });

  request.on('error', (error) => {
    console.error('Failed to fetch API:', error);
    res.status(500).json({ error: 'Failed to fetch API' });
  });

  request.end();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});