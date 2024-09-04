
import React, { useContext, useEffect, useState } from "react";
import { getExternalConsumptionAPI } from "../../../../utils/httpUtilsExternalAPI";
import {  ServiceContext } from "@msx/platform-services";
export    const FetchPriorityOptions = async () => {
    const context = React.useContext(ServiceContext);
    try {
      const response = await getExternalConsumptionAPI(
        "api/FormData/GetFormDataOptions?key=Priority",
        context.authClient
      );
      console.log(response,"response")
      const responseData = response?.data[0]?.value;
      console.log(responseData, "priority");
      return responseData;
      // setPriorityOptions(responseData);
    } catch (error) {
      console.error("Error fetching form data options:", error);
    }
  };