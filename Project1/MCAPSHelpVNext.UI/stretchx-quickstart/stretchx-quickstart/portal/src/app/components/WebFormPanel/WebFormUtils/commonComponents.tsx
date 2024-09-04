import React, { useEffect, useState } from "react";
import {
  Dropdown,
  IDropdownOption,
  IPeoplePickerItemSelectedProps,
  IPersonaProps,
  ITag,
  NormalPeoplePicker,
  PeoplePickerItem,
  TagPicker,
  ValidationState,
} from "@fluentui/react";
import {
  GetSPMAccountsUsingNameORId,
  debouncedApiCall,
  debouncedSalesUnitApiCall,
  getFormDataOptions,
  getSalesUnitOptions,
  getSuggestionsFromAPI,
} from "./formApiUtils";
import { ServiceContext } from "@msx/platform-services";
import messages from "../WebFormPanel.messages";

export const StaticDropdown: React.FC<{
  label?: string;
  optionsKey?: string;
  defaultSelectedKey?: any;
  placeholderText?: any;
  isMultiselect?: any;
  selectedKey?: any;
  selectedKeys?: [];
  hoverText?: string;
  onChange: (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption | IDropdownOption[],
    index?: number
  ) => void;
}> = ({
  label,
  onChange,
  defaultSelectedKey,
  optionsKey,
  placeholderText,
  isMultiselect,
  selectedKey,
  hoverText,
}) => {
  const context = React.useContext(ServiceContext);
  const [options, setOptions] = useState<IDropdownOption[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const options = await getFormDataOptions(optionsKey, context);
      setOptions(options);
    };
    if (context) {
      fetchOptions();
    }
  }, []);

  return (
    <Dropdown
      label={label}
      options={options}
      onChange={onChange}
      defaultSelectedKey={defaultSelectedKey}
      selectedKey={selectedKey}
      styles={{ root: { width: "100%" } }}
      placeholder={placeholderText}
      multiSelect={isMultiselect}
      title={hoverText}
    />
  );
};

export const DynamicDropdown: React.FC<{
  placeholderText?: any;
  onChange?: any;
  hoverText?: any;
  resetValue?: any;
  apiEndPoint?: any;
  itemLimit?: any;
  staticOptions?: any;
  dependentKey?: any;
}> = ({
  onChange,
  placeholderText,
  hoverText,
  resetValue,
  apiEndPoint,
  itemLimit,
  staticOptions,
  dependentKey,
}) => {
  const context = React.useContext(ServiceContext);
  const [selectedOptions, setSelectedOptions] = useState<ITag[]>([]);

  useEffect(() => {
    if (resetValue) {
      setSelectedOptions([]);
    }
  }, [resetValue]);

  const onResolveSuggestions = async (filter: string): Promise<ITag[]> => {
    if (filter?.length >= 2) {
      let suggestions =
        staticOptions ??
        (await getSuggestionsFromAPI(
          apiEndPoint,
          filter,
          dependentKey,
          context
        ));
      // Filter out selected options
      suggestions = suggestions?.filter(
        (suggestion) =>
          !selectedOptions.some((selected) => selected.name === suggestion.text)
      );

      suggestions = suggestions?.filter((suggestion) =>
        suggestion.text.toLowerCase().includes(filter.toLowerCase())
      );

      return suggestions?.map((suggestion) => ({
        key: suggestion?.key,
        name: suggestion?.text,
      }));
    } else {
      return handleEmptyResolveSuggestions();
    }
  };

  const handleEmptyResolveSuggestions = async (): Promise<ITag[]> => {
    let suggestions =
      staticOptions ??
      (await getSuggestionsFromAPI(apiEndPoint, "", dependentKey, context));
    // Filter out selected options
    suggestions = suggestions?.filter(
      (suggestion) =>
        !selectedOptions.some((selected) => selected.name === suggestion.text)
    );

    return suggestions?.map((suggestion) => ({
      key: suggestion?.key,
      name: suggestion?.text,
    }));
  };

  const handleSelectionChange = (items?: ITag[]): void => {
    if (items) {
      setSelectedOptions(items);
      onChange(items);
    }
  };
  return (
    <TagPicker
      inputProps={{ placeholder: placeholderText, title: hoverText }}
      onResolveSuggestions={async (filter: string) => {
        const filteredSuggestions = await onResolveSuggestions(filter);
        return filteredSuggestions;
      }}
      onEmptyResolveSuggestions={handleEmptyResolveSuggestions}
      onChange={handleSelectionChange}
      selectedItems={resetValue ? [] : selectedOptions}
      getTextFromItem={(tag: ITag) => tag.name}
      pickerSuggestionsProps={{
        noResultsFoundText: "No results found",
        loadingText: "Loading...",
      }}
      itemLimit={itemLimit}
    />
  );
};

export const SalesUnitDropdown: React.FC<{
  placeholderText?: any;
  onChange?: any;
  resetValue?: any;
  hoverText?: any;
}> = ({ onChange, placeholderText, resetValue, hoverText }) => {
  const context = React.useContext(ServiceContext);
  const [selectedItems, setSelectedItems] = useState<ITag[]>([]);

  useEffect(() => {
    if (resetValue) {
      setSelectedItems([]);
    }
  }, [resetValue]);

  const onResolveSalesUnitSuggestions = async (
    filter: string
  ): Promise<ITag[]> => {
    let suggestions = await debouncedSalesUnitApiCall(filter, context);

    // Filter out selected options
    suggestions = suggestions?.filter(
      (suggestion) =>
        !selectedItems.some((selected) => selected.name === suggestion.text)
    );
    return suggestions?.map((suggestion) => ({
      key: suggestion?.key,
      name: suggestion?.text,
    }));
  };

  const handleEmptyResolveSuggestions = async (): Promise<ITag[]> => {
    let suggestions = await getSalesUnitOptions(context);

    // Filter out selected options
    suggestions = suggestions?.filter(
      (suggestion) =>
        !selectedItems.some((selected) => selected.name === suggestion.text)
    );
    return suggestions;
  };

  const handleDropdownChange = (items?: ITag[]): void => {
    setSelectedItems(items);
    onChange(items);
  };

  return (
    <TagPicker
      inputProps={{ placeholder: placeholderText, title: hoverText }}
      onResolveSuggestions={async (filter: string) => {
        const filteredSuggestions = await onResolveSalesUnitSuggestions(filter);
        return filteredSuggestions;
      }}
      onEmptyResolveSuggestions={handleEmptyResolveSuggestions}
      onChange={handleDropdownChange}
      selectedItems={selectedItems}
      getTextFromItem={(tag: ITag) => tag.name}
      pickerSuggestionsProps={{
        noResultsFoundText: "No results found",
        loadingText: "Loading...",
      }}
      itemLimit={1}
    />
  );
};

export const TPIDDynamicDropdown: React.FC<{
  placeholderText?: any;
  onChange?: any;
  resetValue?: any;
  hoverText?: any;
  itemLimit?: any;
  createNew?: any;
}> = ({
  onChange,
  placeholderText,
  resetValue,
  hoverText,
  itemLimit,
  createNew,
}) => {
  const context = React.useContext(ServiceContext);
  const getTextFromItem = (tag: ITag) => tag.name;

  const [selectedItems, setSelectedItems] = useState<ITag[]>([]);
  console.log(selectedItems);

  useEffect(() => {
    if (resetValue) {
      setSelectedItems([]);
    }
  }, [resetValue]);

  const handleDropdownChange = (items: ITag[]) => {
    setSelectedItems(items);
    onChange(items);
  };

  const onResolveTPIDSuggestions = async (filter: string): Promise<ITag[]> => {
    let suggestions: ITag[] = await GetSPMAccountsUsingNameORId(
      filter,
      context
    );
    const createNewItem = (input) => {
      return {
        key: input,
        text: input,
        name: input,
      };
    };
    // Check if createNew is true and the filter is not empty
    if (createNew && filter !== "") {
      if (
        !suggestions?.some(
          (item) => item.name.toLowerCase() === filter.toLowerCase()
        )
      ) {
        suggestions?.push(createNewItem(filter));
      }
    }

    // Filter out already selected items
    suggestions = suggestions?.filter(
      (suggestion) =>
        !selectedItems.some((selected) => selected.key === suggestion.key)
    );

    return suggestions;
  };

  return (
    <TagPicker
      onResolveSuggestions={onResolveTPIDSuggestions}
      inputProps={{ placeholder: placeholderText, title: hoverText }}
      onChange={handleDropdownChange}
      pickerSuggestionsProps={{
        noResultsFoundText: "No results found",
        loadingText: "Loading...",
      }}
      itemLimit={itemLimit}
      getTextFromItem={getTextFromItem}
      selectedItems={selectedItems}
      styles={{ root: { width: "100%" } }}
    />
  );
};

export const PeoplePickerComponent: React.FC<{
  placeholderText?: any;
  onChange: (items: IPersonaProps[]) => void;
  itemLimit?: any;
  hoverText?: string;
  resetValue?: any;
}> = ({ onChange, placeholderText, itemLimit, hoverText, resetValue }) => {
  const context = React.useContext(ServiceContext);
  const [selectedPeopleCount, setSelectedPeopleCount] = useState(0);
  const [selectedPeople, setSelectedPeople] = useState<IPersonaProps[]>([]);

  useEffect(() => {
    if (!resetValue && selectedPeople.length > 0) {
      setSelectedPeopleCount(selectedPeople.length);
    } else {
      setSelectedPeopleCount(0);
      setSelectedPeople([])
    }
  }, [resetValue]);

  const onResolveSuggestions = async (
    filterText: string
  ): Promise<IPersonaProps[]> => {
    const suggestions = await debouncedApiCall(filterText, context);
    const filteredSuggestions = suggestions?.filter(
      (suggestion) =>
        !selectedPeople.some(
          (selectedPerson) => selectedPerson.text === suggestion.text
        )
    );
    return filteredSuggestions;
  };
  const renderItemWithSecondaryText = (
    props: IPeoplePickerItemSelectedProps
  ) => {
    const newProps = {
      ...props,
      item: {
        ...props.item,
        ValidationState: ValidationState.valid,
        showSecondaryText: true,
      },
    };

    return <PeoplePickerItem {...newProps} />;
  };

  const handlePickerChange = (items: IPersonaProps[]) => {
    setSelectedPeopleCount(items.length);
    setSelectedPeople(items);
    onChange(items);
  };

  return (
    <NormalPeoplePicker
      onResolveSuggestions={onResolveSuggestions}
      pickerSuggestionsProps={{
        noResultsFoundText: "No results found",
        loadingText: "Loading...",
      }}
      styles={{ root: { width: "100%" } }}
      getTextFromItem={(props: IPersonaProps) => props.text}
      onRenderItem={renderItemWithSecondaryText}
      onChange={handlePickerChange}
      selectedItems={resetValue ? [] : selectedPeople}
      key="normal-people-picker"
      removeButtonAriaLabel={"Remove"}
      inputProps={{
        "aria-label": "People Picker",
        placeholder:
          selectedPeopleCount >= 5
            ? messages.maxPeoplePickerPlaceholderText.defaultMessage
            : placeholderText,
        readOnly: selectedPeopleCount >= 5,
        title: hoverText,
      }}
      itemLimit={itemLimit}
    />
  );
};
