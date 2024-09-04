import apiService from "../../errorHandling/appService";
  
export const getExternalConsumptionAPI = async (
    url: string,
    parentContext: any
  ): Promise<any> => {
    try {
      const auth = parentContext.authContext;
      const accounts = auth.getAllAccounts();
      const resource: any = { scopes: [process.env.REACT_APP_EXT_API_RESOURCE],};
      const apiEndPoint = `${process.env.REACT_APP_EXT_API_BASE_URL}`;
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