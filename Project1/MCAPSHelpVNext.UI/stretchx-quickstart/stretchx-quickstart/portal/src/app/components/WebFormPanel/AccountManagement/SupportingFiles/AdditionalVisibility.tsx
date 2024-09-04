import { IPeoplePickerItemSelectedProps, IPersonaProps, Label, NormalPeoplePicker, PeoplePickerItem, Stack, ValidationState } from "@fluentui/react";
import React from "react";
import { ServiceContext } from "@msx/platform-services";
import _ from "lodash";
import { getConsumptionAPI } from "../../../../utils/httpUtils";
export const AdditionalVisibility =({config,handleAdditionalVisibilityChange} )=>{
    
  const context = React.useContext(ServiceContext);
    const renderItemWithSecondaryText = (props: IPeoplePickerItemSelectedProps) => {
        const newProps = {
          ...props,
          item: {
            ...props.item,ValidationState: ValidationState.valid,showSecondaryText: true,
          },
        };
        return <PeoplePickerItem {...newProps} />;
      };
    
      const onResolveSuggestions = async (filterText: string): Promise<IPersonaProps[]> => {
        const suggestions = await debouncedApiCall(filterText);
        return suggestions?.slice(0, 5);
      };
    
      const debouncedApiCall = _.debounce(async (filterText) => {
        if (filterText.length < 3) {
          return [];
        }
        try {
          const response = await getConsumptionAPI(`/api/Graph/GraphUserName/${filterText}`,context.authClient);
          const data = await response.data;
          const filteredSuggestions = data.value.map((option) => ({
            key: option.userPrincipalName,
            text: option.displayName,
            upn: option.userPrincipalName,
            email: option.mail,
            secondaryText: option.jobTitle?option.jobTitle:option.mail,
          }));
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
        <>
            <Stack
              horizontal
              styles={{ root: { width: "100%", marginTop: 15 } }}
            >
              <Stack styles={{ root: { width: "33%" } }}>
                <Label>Additional Visibility (CC)</Label>
                <NormalPeoplePicker
                  onResolveSuggestions={onResolveSuggestions}
                  pickerSuggestionsProps={{
                    noResultsFoundText: "No results found",
                    loadingText: "Loading...",
                  }}
                  getTextFromItem={(props: IPersonaProps) => props.text}
                  onRenderItem={renderItemWithSecondaryText}
                  onChange={handleAdditionalVisibilityChange}
                  key="normal-people-picker"
                  removeButtonAriaLabel={"Remove"}
                  inputProps={{
                    "aria-label": "People Picker",
                    placeholder:config?.["Account management Support - Parenting/Segmentation Question"]?.typeOfRequest["Parenting/Segmentation Question"]?.["Additional visibility (CC)"]?.placeholderText,
                    // placeholder:config["Revenue Support - Parenting/Segmentation Question"].typeOfRequest["Parenting/Segmentation Question"]["Additional visibility (CC)"].placeholderText,
                  }}
                />
              </Stack>
            </Stack> 
        </>
    )
}