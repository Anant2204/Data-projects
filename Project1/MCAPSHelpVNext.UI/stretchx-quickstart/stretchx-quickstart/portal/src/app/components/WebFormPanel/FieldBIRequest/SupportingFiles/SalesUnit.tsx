import { Dropdown, Label, Stack } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { getExternalConsumptionAPI } from "../../../../utils/httpUtilsExternalAPI";
import { ServiceContext } from "@msx/platform-services";
export const SalesUnit = ({
  configData,
  checkRequiredFields,
  service,
  requestType,
  classes,
  handleSalesUnitChange,
  fieldArea,
}) => {
  const context = React.useContext(ServiceContext);
  const [salesOptions, setSalesOptions] = useState(null);
  const fetchSalesOptions = async () => {
    try {
      let response = await getExternalConsumptionAPI(
        `api/FormData/GetSalesUnitByFieldArea/${fieldArea}`,
        context.authClient
      );
      setSalesOptions(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSalesOptions();
  }, [fieldArea]);
  return (
    <>
      <Stack
        verticalAlign="center"
        wrap
        style={{ width: "31.4%", marginTop: "30px" }}>
        <Label style={{ width: "23rem" }} required>
          <span
            className={
              checkRequiredFields(
                service,
                requestType,
                "Sales Unit",
                "salesUnit"
              )
                ? classes.requiredfield
                : ""
            }>
            {
              configData?.[service]?.typeOfRequest?.[requestType]?.[
                "Sales Unit"
              ]?.fieldName
            }
          </span>
        </Label>
        <Dropdown
          placeholder={
            configData?.[service]?.typeOfRequest?.[requestType]?.["Sales Unit"]
              ?.placeholderText
          }
          defaultSelectedKey=""
          options={salesOptions !== null ? salesOptions : []}
          styles={{
            root: { width: "100%" },
            label: { fontWeight: 600, marginTop: "19px" },
          }}
          onChange={(e, option) => handleSalesUnitChange(option)}
        />
      </Stack>
    </>
  );
};
