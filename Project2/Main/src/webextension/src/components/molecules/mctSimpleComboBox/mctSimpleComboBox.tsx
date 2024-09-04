import React, { useEffect, useRef } from 'react';
import {
  Combobox,
  Option,
  useId,
} from "@fluentui/react-components";
import { FluentProvider, webLightTheme, webDarkTheme } from '@fluentui/react-components';
import type { ComboboxProps } from "@fluentui/react-components";
import { injectIntl } from "react-intl";
import { messages } from "./mctSimpleComboBox.messages";
import { getStyles } from "./mctSimpleComboBox.styles";
import { classNamesFunction } from '@fluentui/react';
import { getCurrentTheme } from '../../../utils';

export const MctSimpleComboBoxComponent = (props) => {
  const {
    parentContext,
    onSelectOptions,
    placeholder,
    options,
    disabled,
    defaultSelectedOption,
    intl,
    comboId,
    comboWidth,
    errorMessage1,
    isRequiredField = false, 
    ...restProps
  } = props;
 // const comboId = useId("combo-multi");
  const selectedListId = `${comboId}-selection`;
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const [value, setValue] = React.useState(placeholder);
  const labelledBy = selectedOptions.length > 0 ? `${comboId} ${selectedListId}` : comboId;

  const comboBoxRef = useRef(null);
  // resetting the options on blur
  const onBlur = () => {
    setMatchingOptions([...options])
  };

  const [matchingOptions, setMatchingOptions] = React.useState([...options]);
  const [customSearch, setCustomSearch] = React.useState<string | undefined>();
  const theme = getCurrentTheme(parentContext);
  const getClassNames = classNamesFunction<any, any>();
  let classes: any;
  classes = getClassNames(getStyles());
  
    const onChange: ComboboxProps["onChange"] = (event) => {
    const value = event.target.value.trim();
    const matches = options.filter(
      (option) => (option.text.toLowerCase().indexOf(value.toLowerCase()) === 0 || option.key.toLowerCase().indexOf(value.toLowerCase()) === 0)
    );
    setMatchingOptions(matches);
    if (value.length && matches.length < 1) {
      setCustomSearch(value);
    } else {
      
      setCustomSearch(undefined);
    }
  };

  const onOptionSelect: ComboboxProps["onOptionSelect"] = (event, data) => {
    const matchingOption = data.optionText && options.some(option => option.key === data.optionText);
    if (matchingOption) {
      setCustomSearch(undefined);
      data.selectedOptions && setSelectedOptions(data.selectedOptions);
    }
    onSelectOptions(data.selectedOptions);
  };

  const CustomOption = ({ text }) => {
    return <span>{`${intl.formatMessage(messages.noResultFound)} ${text}`}</span>;
  };

  useEffect(() => {
    if (options?.length > 0){
      setCustomSearch(undefined);
      setMatchingOptions([...options]);
    }
  }, [options]);

  useEffect(() => {
    if (defaultSelectedOption?.length > 0) {
      setSelectedOptions(defaultSelectedOption);
    }
  }, [defaultSelectedOption])

  const handleOpenChange = (e, data) => {
    if (data.open  && matchingOptions.length !== 0) {
      setCustomSearch(undefined)
    }
  };

  return (
    <FluentProvider
      theme={props.theme === "dark" ? webDarkTheme : webLightTheme}
    >
      <Combobox
        aria-labelledby={labelledBy}
        aria-required={isRequiredField} 
        placeholder={selectedOptions?.length > 0 ? selectedOptions[0] : value}
        onBlur={onBlur}
        onChange={onChange}
        onOptionSelect={onOptionSelect}
        selectedOptions={selectedOptions}
        disabled={disabled}
        ref={comboBoxRef}
        onOpenChange={handleOpenChange}
        style={{ width: comboWidth, border: errorMessage1 ? '1px solid #a4262c' : '1px solid #c8c8c8'}}
        id={comboId}
        autoComplete='off'
        {...restProps}
        className={classes.dropdownborderError}
      >
        {customSearch ? (
          <CustomOption text={customSearch} />
        ) : null}
        {matchingOptions.map((option) => (
          <Option key={option.key} text={option.key}>
            {option.text}
          </Option>
        ))}
      </Combobox>
      <div className={classes.dropdownLabelError}>{errorMessage1}</div>
    </FluentProvider>
  );
}

export const MctSimpleComboBox = injectIntl(MctSimpleComboBoxComponent);
