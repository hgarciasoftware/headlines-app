const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const API_HOST = 'newsapi.org/v2';
const API_ENDPOINT = '/top-headlines';

const server = express();
const corsOptions = {origin: 'https://hgarciasoftware.github.io'};

server.get('/', cors(corsOptions), (req, res) => {
  const { country, category } = req.query;

  if (country === undefined || category === undefined) {
    return res.status(400).json({status: 'error'});
  }

  fetch(`https://${API_HOST}${API_ENDPOINT}?apiKey=${process.env.API_KEY}&country=${country}&category=${category}`)
    .then(response => response.json())
    .then(data => res.json(data));
});

server.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});
