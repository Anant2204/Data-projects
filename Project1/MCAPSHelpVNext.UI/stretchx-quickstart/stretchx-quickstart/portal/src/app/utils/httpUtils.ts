import { IAppContext } from "@msx/platform-services";
import axios from "axios";


import apiService from "../../errorHandling/appService";
import { parse } from "path";

export const getHeaderTokenFunc = async (
  parentContext: any, usedToken: any
): Promise<any> => {
  try {
    const startTime = performance.now();
    const auth = parentContext.authContext;
    const accounts = auth.getAllAccounts();
    const resource: any = { scopes: [process.env.REACT_APP_API_RESOURCE] };
    if (accounts.length > 0) {
      auth.setActiveAccount(accounts[0]);
    }
    let refreshedToken = usedToken;
    if (shouldRefreshToken(usedToken)) {
      try {
        refreshedToken = await auth?.acquireTokenSilent(resource);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);      
        throw refreshError;
      }
    }
    const request = {
      headers: {
        Authorization: "Bearer " + refreshedToken.accessToken,
      },
    };
    const endTime = performance.now();
    const responseTime = endTime - startTime;
    return { request, token: refreshedToken };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

const shouldRefreshToken = (token: any): boolean => {  
  if (token && token.expiresOn) {
    const expirationTime = new Date(token.expiresOn).getTime();
    const currentTime = new Date().getTime();
    const thirtyMinutesInMilliseconds = parseInt(process.env.REACT_APP_ACCESS_TOKEN_EXPIRY_DURATION) * 60 * 1000;
    return currentTime >= expirationTime - thirtyMinutesInMilliseconds;
  }
  return true;
}

// export const getHeaderTokenFunc = async (
//   parentContext: any, usedToken : any
// ): Promise<any> => {
//   try {

//     const startTime = performance.now();
//     const auth = parentContext.authContext;
//     const accounts = auth.getAllAccounts();
//     const resource: any = { scopes: [process.env.REACT_APP_API_RESOURCE]};
   
   
//     if (accounts.length > 0) {
//       auth.setActiveAccount(accounts[0]);
//     }

//     // if(usedToken !== undefined && usedToken !== null){
//     //   await auth?.
//     // }
    
//     const token = await auth?.acquireTokenSilent(resource);
//     const request = {
//       headers: {
//         Authorization: "Bearer " + token.accessToken,
//       },
//     };

//     const endTime = performance.now();
//     const responseTime = endTime - startTime;
//     console.log(`Response time getHeaderTokenFunc() in httpUtils: ${responseTime} milliseconds`);
//     return request;
//   } catch (err) {
//     if (err) {
//       return err;
//     }
//   }
// };

export const getConsumptionAPI = async (
  url: string,
  parentContext: any
): Promise<any> => {
  try {
    const auth = parentContext.authContext;
    const accounts = auth.getAllAccounts();
    const resource: any = { scopes: [process.env.REACT_APP_API_RESOURCE],};
    const apiEndPoint = `${process.env.REACT_APP_Consumption_API_ENDPOINT}`;
   const apiURL= apiEndPoint+url;
    if (accounts.length > 0) {
      auth.setActiveAccount(accounts[0]);
    }
    const token = await auth?.acquireTokenSilent(resource);
    const request = {
      headers: {
        Authorization: "Bearer " + token.accessToken,
      },
    };
     // Use the generic apiService for the request
     const response = await apiService(apiURL,'GET',null,request.headers)
    return response;
  } catch (err) {
    if (err && err.response) {
      return err.response;
    } else {
      return err;
    }
  }
};

export const postConsumptionAPI = async (
  url: string,
  postData: object | FormData,
  parentContext: any
): Promise<any> => {
  try {
    const auth = parentContext.authContext;
    const accounts = auth.getAllAccounts();
    const resource: any = { scopes: [process.env.REACT_APP_API_RESOURCE] };
    const apiEndPoint = `${process.env.REACT_APP_Consumption_API_ENDPOINT}`;
    const apiURL = apiEndPoint + url;
    if (accounts.length > 0) {
      auth.setActiveAccount(accounts[0]);
    }
    const token = await auth?.acquireTokenSilent(resource);

    let headers = {
      Authorization: "Bearer " + token.accessToken,
    };

    let request: any = {
      headers: headers,
      method: 'POST',
    };

    if (postData instanceof FormData) {
     
      headers['Content-Type'] = 'multipart/form-data';
      request.body = postData;
    } else {
      headers['Content-Type'] = 'application/json';
      request.body = JSON.stringify(postData);
    }

    let response = await apiService(apiURL, request.method, request.body, request.headers);
    return response;
  } catch (err) {
    // logException(parentContext, url, err);
    if (err && err.response) {
      return err.response;
    } else {
      return err;
    }
  }
};


export const putConsumptionAPI = async (
  url: string,
  putData: object,
  parentContext: any
): Promise<any> => {
  try {
    const auth = parentContext.authContext;
    const accounts = auth.getAllAccounts();
    const resource: any = { scopes: [process.env.REACT_APP_API_RESOURCE],};
    const apiEndPoint = `${process.env.REACT_APP_Consumption_API_ENDPOINT}`;
    const apiURL= apiEndPoint+url;
    if (accounts.length > 0) {
      auth.setActiveAccount(accounts[0]);
    }
    const token = await auth?.acquireTokenSilent(resource);
    const request = {
      headers: {
        Authorization: "Bearer " + token.accessToken,
      },
    };
    let response = await apiService(apiURL, 'PUT', putData,request.headers);
    return response;
  } catch (err) {

    if (err && err.response) {
      return err.response;
    } else {
      return err;
    }
  }
};

export const deleteConsumptionAPI = async (
  url: string,
  parentContext: any
): Promise<any> => {
  try {
    const auth = parentContext.authContext;
    const accounts = auth.getAllAccounts();
    const resource: any = { scopes: [process.env.REACT_APP_API_RESOURCE],};
    const apiEndPoint = `${process.env.REACT_APP_Consumption_API_ENDPOINT}`;
    const apiURL= apiEndPoint+url;
 
    if (accounts.length > 0) {
      auth.setActiveAccount(accounts[0]);
    }
    const token = await auth?.acquireTokenSilent(resource);
    const request = {
      headers: {
        Authorization: "Bearer " + token.accessToken,
      },
    };
    let response = await apiService(apiURL, 'DELETE', null,request.headers);
    return response;
  } catch (err) {
    // logException(parentContext, url, err);
    if (err && err.response) {
      return err.response;
    } else {
      return err;
    }
  }
};

export const getAccessToken = async (
  // url: string,
  parentContext: any
): Promise<any> => {
  try {
    const auth = parentContext.authContext;
    const accounts = auth.getAllAccounts();
    const resource: any = process.env.REACT_APP_Consumption_API_RESOURCE_ID;
    const apiEndPoint = `${process.env.REACT_APP_Consumption_API_ENDPOINT}`;

    const token = await auth?.acquireTokenSilent(resource);  
    return token.accessToken;

  } catch (err) {
    // logException(parentContext, url, err);
    if (err && err.response) {
      return err.response;
    } else {
      return err;
    }
  }
};


export const getSalesUnitConsumptionAPI = async (
  url: string,
  parentContext: any
): Promise<any> => {
  try {
    const auth = parentContext.authContext;
    const accounts = auth.getAllAccounts();
    const resource: any = { scopes: [process.env.REACT_APP_API_RESOURCE],};
    const apiEndPoint = `https://mcapshelpexternalapidev.azurewebsites.net/`;
   const apiURL= apiEndPoint+url;
    if (accounts.length > 0) {
      auth.setActiveAccount(accounts[0]);
    }
    const token = await auth?.acquireTokenSilent(resource);
    const request = {
      headers: {
        Authorization: "Bearer " + token.accessToken,
      },
    };
 
    const response = await apiService(apiURL,'GET',null,request.headers)
    return response;
  } catch (err) {
    if (err && err.response) {
      return err.response;
    } else {
      return err;
    }
  }
};