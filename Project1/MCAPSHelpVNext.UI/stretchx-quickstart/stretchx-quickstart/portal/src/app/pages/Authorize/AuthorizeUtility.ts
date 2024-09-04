import apiService from "../../../errorHandling/appService";


export const getGraphTransitiveMemberOf = async ( parentContext: any): Promise<any> => {
    const auth = parentContext.authContext;
    const accounts = auth.getAllAccounts();
    const account = accounts[0];
    let accessTokenRequest ={ scopes: ["openid", "profile", "User.Read"],
    account}
    try {
      const startTime = performance.now();
      const apiURL = `https://graph.microsoft.com/v1.0/me/transitiveMemberOf/microsoft.graph.group?$count=true&$search=("displayName: ${process.env.REACT_APP_USER_AUTH_GROUP}")`;
      if (accounts.length > 0) {
        auth.setActiveAccount(accounts[0]);
      }
     
      const token = await auth?.acquireTokenSilent(accessTokenRequest);
      const request = {
        headers: {
          Authorization: "Bearer " + token.accessToken,
          "ConsistencyLevel": "eventual"
        },
      };

     

       // Use the generic apiService for the request
       const response = await apiService(apiURL,'GET',null,request.headers)

       const endTime = performance.now();
       const responseTime = endTime - startTime;
       console.log(`Response time getGraphTransitiveMemberOf() in AuthorizeUtility: ${responseTime} milliseconds`);

      return response;
    } catch (err) {
        await auth?.acquireTokenRedirect(accessTokenRequest);
      if (err && err.response) {
        return err.response;
      } else {
        return err;
      }
    }
  };

 