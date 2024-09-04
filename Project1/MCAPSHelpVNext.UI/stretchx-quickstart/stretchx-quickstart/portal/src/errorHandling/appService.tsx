import axios from 'axios';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: process.env.REACT_APP_INSTRUMENTATION_KEY
  }
});

appInsights.loadAppInsights();

const apiService = async (url, method, data, headers) => {
  try {
    const response = await axios(
      url, {
        method,
        data,
        headers,
      });
    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response;
      case 401:
         appInsights.trackTrace({ message: `Authentication failed or user lacks necessary permissions. ${response.status}.` });
        throw new Error(`Authentication failed or user lacks necessary permissions.`);
      default:
        // appInsights.trackTrace({ message: `Unexpected status code ${response.status}.` });
        // throw new Error(`Unexpected status code ${response.status}.`);
        appInsights.trackTrace({ message: `Error: ${response.data.Message}  TagId: ${response.data.CorrelationId}  StatusCode: ${response.data.Code}`});
        return response;
    }
  } catch (error) {
    if (error.response) {
      appInsights.trackException({ exception: error.response });
      throw error.response;
    } else if (error.request) {
      appInsights.trackException({ exception: error.request });
      throw error.request;
    } else {
      appInsights.trackException({ exception: error });
      throw error;
    }
  }
};

export default apiService;
