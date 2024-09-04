
import React, { useContext, useEffect, useState } from "react";
import { getExternalConsumptionAPI } from "../../../../utils/httpUtilsExternalAPI";
import {  ServiceContext } from "@msx/platform-services";

export const FetchSalesUnitOptions = async () => {
    const context = React.useContext(ServiceContext);
    try {
      const response = await getExternalConsumptionAPI(
        "api/SalesUnit/GetSalesUnit",
        context.authClient
      );
      console.log(response,"saLES")
      if (response?.data?.value) {
        const salesUnits = response.data.value;
        const sghOptions = salesUnits.map((unit) => ({
          key: unit.SGHGUID,
          text: unit.SGHName,
        }));
        return sghOptions;
      } else {
        console.error(
          "Empty response received while fetching sales unit options."
        );
      }
    } catch (error) {
      console.error("Error fetching sales unit options:", error);
    }
  };