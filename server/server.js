const axios = require('axios');
const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https'); // Import the 'https' module
const cors = require('cors');

app.use(cors());

// Define endpoint and credentials
const apiKey = 'vYHHpQQsII92D60QBehJWzoBkO+kZW5oiyqsTLXOhu+z2BNy8MZ3Ax4nseJbCDF0pW5tQ52bbR+AHPel';
const apiSecret = 'wXHy7GQsLwE/Y2fm1qD1CcQ8e3L7leEsxmEDG5fbOez+pu3s9TKwOxWG1Xz8UeAETMfzaZxyd3WnDydD';
const statusurl = 'https://34.145.133.159/api/core/firmware/status';
const infourl = 'https://34.145.133.159/api/core/firmware/info';

// Set up Axios to use the provided certificate file
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  auth: {
    username: apiKey,
    password: apiSecret,
  },
});

// Firmware update status API Endpoint
app.get('/api/firmware/status', (req, res) => {
  axiosInstance.get(statusurl)
    .then((response) => {
      if (response.status === 200) {
        const responseData = response.data;

        if (responseData.status === 'ok') {
          // Construct a JSON object with the information
          const firmwareStatus = {
            upgradeAvailable: true,
            downloadSize: responseData.download_size,
            numberOfPackages: responseData.updates,
            rebootRequired: responseData.upgrade_needs_reboot === '0' ? false : true,
          };

          // Send the JSON data as part of the HTTP response
          res.status(200).json(firmwareStatus);
        } else if (responseData.status_msg) {
          // Send an error message as part of the HTTP response
          res.status(200).json({ errorMessage: responseData.status_msg });
        }
      } else {
        // Handle connection/authentication issues and send an error response
        console.log('Connection / Authentication issue, response received:');
        console.log(response.data);
        res.status(500).json({ error: 'Error making OPNsense API call' });
      }
    })
    .catch((error) => {
      // Handle any other errors and send an error response
      console.error('Error making OPNsense API call:', error.message);
      res.status(500).json({ error: error.message });
    });
});

// Firmware info API Endpoint
app.get('/api/firmware/info', (req, res) => {
  axiosInstance.get(infourl)
    .then((response) => {
      if (response.status === 200) {
        const responseData = response.data;
       
          const firmwareInfo = {
            productID: responseData.product_id,
            productVersion: responseData.product_version,
            changeLog: responseData.changelog,
          };

          res.status(200).json(firmwareInfo);
      } else {
        console.log('Connection / Authentication issue, response status:', response.status);
        res.status(500).json({ error: 'Error making OPNsense API call' });
      }
    })
    .catch((error) => {
      console.error('Error making OPNsense API call:', error.message);
      res.status(500).json({ error: error.message });
    });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

