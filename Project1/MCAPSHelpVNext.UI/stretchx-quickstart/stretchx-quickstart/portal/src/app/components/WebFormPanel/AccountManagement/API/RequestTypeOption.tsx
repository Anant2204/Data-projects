
import React, { useContext, useEffect, useState } from "react";
import { getExternalConsumptionAPI } from "../../../../utils/httpUtilsExternalAPI";
import {  ServiceContext } from "@msx/platform-services";
export  const FetchRequestTypeOptions = async () :Promise<any> => {
   
    try {
        const context = React.useContext(ServiceContext);
      const response = await getExternalConsumptionAPI(
        "api/FormData/GetFormDataOptions?key=requesttype-AMS",
        context.authClient
      );
      const responseData = response?.data[0]?.value;
      console.log(responseData);
      return responseData;
    //   setRequestTypeOptions(responseData);
    } catch (error) {
      console.error("Error fetching form data options:", error);
    }
  };