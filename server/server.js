const express = require('express');
const axios = require('axios');
const fs = require('fs'); // Include the 'fs' module
const https = require('https');

const app = express();
const port = 3005; // Replace with your desired port number

// Specify the path to your self-signed certificate
const certificatePath = 'C:/Users/jharb/Downloads/opnsensecert.crt';


// Set up an HTTPS agent with the certificate
const httpsAgent = new https.Agent({
  ca: fs.readFileSync(certificatePath),
});

// Create an Axios instance configured with the HTTPS agent
const axiosInstance = axios.create({
  httpsAgent: httpsAgent,
});

// Your API route using the Axios instance
app.get('/api/opnsense', async (req, res) => {
  try {
    // Define your OpnSense API endpoint and credentials
    const opnsenseApiEndpoint = 'https://34.145.133.159/api/core/menu/search';
    const apiKey = 'vYHHpQQsII92D60QBehJWzoBkO+kZW5oiyqsTLXOhu+z2BNy8MZ3Ax4nseJbCDF0pW5tQ52bbR+AHPel';
    const apiSecret = 'wXHy7GQsLwE/Y2fm1qD1CcQ8e3L7leEsxmEDG5fbOez+pu3s9TKwOxWG1Xz8UeAETMfzaZxyd3WnDydD';

    // Make the API call with axios using the full URL
    const response = await axiosInstance.get(opnsenseApiEndpoint, {
      headers: {
        'Api-Key': apiKey,
        'Api-Secret': apiSecret,
      },
    });

    //const data = await response.json();

    // Return the response data to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error making OpnSense API call:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
