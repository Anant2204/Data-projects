import { CommandBarButton, ITag, Label, Stack, TagPicker, TagPickerBase, ValidationState } from "@fluentui/react";
import React from "react";
import { getExternalConsumptionAPI } from "../../../../utils/httpUtilsExternalAPI";
import _ from "lodash";
import { ServiceContext } from "@msx/platform-services";
export const MultiSelectPicker = ({ idType, api, label, handleIDsChange,customMarginTop="",checkRequiredFields,classes,fieldName="",formName="" }) => {
  const context = React.useContext(ServiceContext);
  let limit = "?topN=50";

 
  const getTextFromItem = (tag: ITag) => tag.name;

  const onResolveSuggestions = async (filterText: string): Promise<ITag[]> => {
    const suggestions = await debouncedApiCall(filterText);

    if (!suggestions?.some(item => item.name.toLowerCase() === filterText.toLowerCase())) {
      suggestions?.push(createNewItem(filterText));
    }
 

    return suggestions?.slice(0, 5);
  };

 
  const createNewItem = (input) => {
    return {
      key: input,
      text: input,
      name: input,
    };
  };

  const debouncedApiCall = _.debounce(async (filterText) => {
    if (filterText.length < 1) {
      return [];
    }
    try {
      const finalApi = api + filterText + limit;
      const response = await getExternalConsumptionAPI(
        finalApi,
        context.authClient
      );
      const data = await response.data;
      let filteredSuggestions;
      if(idType === "Top Parent ID"){
        filteredSuggestions = data.map((option) => ({
         key: option.msSalesAccountId,
         msSalesAccountId: option.msSalesAccountId,
         msSalesAccountName: option.msSalesAccountName,
         name: option.msSalesAccount,
       }));
      
     }else{
        filteredSuggestions = data.map((option) => ({
         key: option.key,
        text: option.text,
         name: option.name,
       }));
      }
      if (response.status !== 200) {
        console.error("Error:", response.status, response.statusText);
        return [];
      }
      return filteredSuggestions;
    } catch (error) {
      console.error("Error fetching data from API:", error);
      return [];
    }
  }, 30);


  return (
    <Stack style={{width:"31.4%",marginTop:customMarginTop?customMarginTop:"30px"}}>
      <Stack
          verticalAlign="center"
          wrap>
          <Label style={{ width: "20rem"}} required>
            <span
              className={
                checkRequiredFields(fieldName,formName)
                ? classes.requiredfield
                : ""
              }>
              {
                label
              }
            </span>
          </Label>
      <TagPicker
        onResolveSuggestions={onResolveSuggestions}
        onChange={handleIDsChange}
        pickerSuggestionsProps={{
          noResultsFoundText: "No results found",
          loadingText: "Loading...",
        }}
        getTextFromItem={getTextFromItem}
        styles={{ root: { width: "100%"} }}
      />
      </Stack>
    </Stack>
  );
};
