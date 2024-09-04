import { ITag, TagPicker } from "@fluentui/react";
import { ServiceContext } from "@msx/platform-services";
import React, { useState } from "react";
import {
  getAwardContestsDropdowns,
  getAwardContestsSearchDropdowns,
} from "./ACIRApiUtils";

export const ACIRDynamicSearchDropdown: React.FC<{
  placeholderText?: any;
  onChange?: any;
  getOptionsOf?: any;
  hoverText?: any;
}> = ({ onChange, placeholderText, getOptionsOf, hoverText }) => {
  const context = React.useContext(ServiceContext);
  const [selectedOptions, setSelectedOptions] = useState<ITag[]>([]);

  const onResolveSuggestions = async (filter: string,): Promise<ITag[]> => {
    if (filter.length > 2) {
      let suggestions = await getAwardContestsSearchDropdowns(
        getOptionsOf,
        filter,
        context
      );  

      // Filter out selected options
      suggestions = suggestions.filter(
        (suggestion) =>
          !selectedOptions.some((selected) => selected.name === suggestion.text)
      );

      return suggestions.map((suggestion) => ({
        key: suggestion?.key,
        name: suggestion?.text,
      }));
    } else {
      return handleEmptyResolveSuggestions();
    }
  };

  const handleEmptyResolveSuggestions = async (): Promise<ITag[]> => {
    let suggestions = await getAwardContestsSearchDropdowns(
      getOptionsOf,
      "",
      context
    );

    // Filter out selected options
    suggestions = suggestions.filter(
      (suggestion) =>
        !selectedOptions.some((selected) => selected.name === suggestion.text)
    );

    return suggestions.map((suggestion) => ({
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
      getTextFromItem={(tag: ITag) => tag.name}
      pickerSuggestionsProps={{
        noResultsFoundText: "No results found",
        loadingText: "Loading...",
      }}
    />
  );
};

export const ACIRDynamicDropdown: React.FC<{
  placeholderText?: any;
  onChange?: any;
  getOptionsOf?: any;
  staticOptions?: any;
  hoverText?: any;
}> = ({
  onChange,
  placeholderText,
  getOptionsOf,
  staticOptions,
  hoverText,
}) => {
  const context = React.useContext(ServiceContext);
  const [selectedOptions, setSelectedOptions] = useState<ITag[]>([]);

  const onResolveSuggestions = async (filter: string): Promise<ITag[]> => {
    if (filter?.length > 2) {
      let suggestions = staticOptions ?? await getAwardContestsDropdowns(getOptionsOf, context);
      // Filter out selected options
      suggestions = suggestions.filter(
        (suggestion) =>
          !selectedOptions.some((selected) => selected.name === suggestion.text)
      );

      suggestions = suggestions.filter((suggestion) =>
        suggestion.text.toLowerCase().includes(filter.toLowerCase())
      );

      return suggestions.map((suggestion) => ({
        key: suggestion?.key,
        name: suggestion?.text,
      }));
    } else {
      return handleEmptyResolveSuggestions();
    }
  };

  const handleEmptyResolveSuggestions = async (): Promise<ITag[]> => {
    let suggestions =
      staticOptions || (await getAwardContestsDropdowns(getOptionsOf, context));
    // Filter out selected options
    suggestions = suggestions.filter(
      (suggestion) =>
        !selectedOptions.some((selected) => selected.name === suggestion.text)
    );

    return suggestions.map((suggestion) => ({
      key: suggestion?.key,
      name: suggestion?.text,
    }));
  };

  const handleSelectionChange = (items?: ITag[]): void => {
      setSelectedOptions(items);
      onChange(items);
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
      getTextFromItem={(tag: ITag) => tag.name}
      pickerSuggestionsProps={{
        noResultsFoundText: "No results found",
        loadingText: "Loading...",
      }}
    />
  );
};
