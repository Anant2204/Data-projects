import React, { useContext, useEffect, useState } from "react";
import { getExternalConsumptionAPI } from "../../../../utils/httpUtilsExternalAPI";
import {  ServiceContext } from "@msx/platform-services";
export    const FetchFormData = async () => {
    const context = React.useContext(ServiceContext);
    try {
      const response = await getExternalConsumptionAPI(
        "api/FormData/GetFormData/Account Management Requests",
        context.authClient
      );
      console.log(response,"formData")
      const responseData = response?.data[0]?.serviceObject;
      console.log(responseData,"responseP");
      return responseData
      // setConfig(responseData);
      // setIsLoading(false);
    } catch (error) {
      console.error("Error fetching config:", error);
    //   setIsLoading(false);
    }
  };