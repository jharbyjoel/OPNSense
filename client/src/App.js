import React, { Component } from 'react';
import axios from 'axios';

class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      apiData: null,
      error: null,
    };
  }

  componentDidMount() {
    // Define the API URL
    const apiUrl = '/api/core/menu/search';

    // Make the API call
    axios.get(apiUrl)
      .then(response => {
        const responseData = response.data;
        this.setState({ apiData: responseData, error: null });
      })
      .catch(error => {
        console.error('API Error:', error);
        this.setState({ apiData: null, error: 'Internal server error' });
      });
  }

  render() {
    const { apiData, error } = this.state;

    return (
      <div>
        <h1>API Response:</h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <pre>{JSON.stringify(apiData, null, 2)}</pre>
        )}
      </div>
    );
  }
}

export default MyComponent;
