const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const express = require('express')

const app = express()
const port = 3000

const API_KEY = "API_KEY";

app.get('/', (req, res) => {
  res.send('API healthy')
})

app.get('/scan', async (req, res) => {
  const data = new FormData();
  data.append('file', fs.createReadStream('./receipt.png'));

  const headers = {
    'Content-Type': 'multipart/form-data',
    'apikey': API_KEY,
    ...data.getHeaders()
  }

  const config = {
    method: 'post',
    url: 'https://api.taggun.io/api/receipt/v1/verbose/file',
    headers,
    data
  };

  try {
    const response = await axios(config)
    return res.send({
      data: response.data
    })

  } catch (e) {
    console.log(e.response.data);

  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})