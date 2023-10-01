const axios = require('axios');
const fs = require('fs');
const https = require('https'); // Import the 'https' module

// Define endpoint and credentials
const apiKey = 'vYHHpQQsII92D60QBehJWzoBkO+kZW5oiyqsTLXOhu+z2BNy8MZ3Ax4nseJbCDF0pW5tQ52bbR+AHPel';
const apiSecret = 'wXHy7GQsLwE/Y2fm1qD1CcQ8e3L7leEsxmEDG5fbOez+pu3s9TKwOxWG1Xz8UeAETMfzaZxyd3WnDydD';
const url = 'https://34.145.133.159/api/core/firmware/status';

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

// Make the request
axiosInstance.get(url)
  .then((response) => {
    if (response.status === 200) {
      const responseData = response.data;

      if (responseData.status === 'ok') {
        console.log('OPNsense can be upgraded');
        console.log(`download size: ${responseData.download_size}`);
        console.log(`number of packages: ${responseData.updates}`);
        if (responseData.upgrade_needs_reboot === '1') {
          console.log('REBOOT REQUIRED');
        }
      } else if (responseData.status_msg) {
        console.log(responseData.status_msg);
      }
    } else {
      console.log('Connection / Authentication issue, response received:');
      console.log(response.data);
    }
  })
  .catch((error) => {
    console.error('Error making OPNsense API call:', error.message);
  });
