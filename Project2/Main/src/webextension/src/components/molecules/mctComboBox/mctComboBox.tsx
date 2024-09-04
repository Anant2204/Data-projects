import React, { useEffect, useRef } from 'react';
import { IMctComboBoxProps } from './mctComboBox.types';
import {
    Combobox,    
    Option,
    useId,
    makeStyles
  } from "@fluentui/react-components";
  import {
    Virtualizer,
    useStaticVirtualizerMeasure,
  } from "@fluentui/react-components/unstable";  
  import { FluentProvider, webLightTheme,webDarkTheme } from '@fluentui/react-components';
  import type { ComboboxProps } from "@fluentui/react-components";
  import { messages } from "./mctComboBox.messages";
  import { injectIntl } from "react-intl";

  const useStyles = makeStyles({
    listbox: {
      maxHeight: "250px",
    },
    option: {
      height: "100px",
    },
  });

export const MctComboBoxComponent = (props ) => {
    const {
      parentContext,
      onSelectOptions,
      placeholder,
      options,
      disabled,
      defaultSelectedOption,
      intl,
      ...restProps
    } = props;
    const comboId = useId("combo-multi");
    const selectedListId = `${comboId}-selection`;
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

    const [value, setValue] = React.useState(placeholder);
    const labelledBy = selectedOptions.length > 0 ? `${comboId} ${selectedListId}` : comboId;
    
    const comboBoxRef = useRef(null);
    const styles = useStyles();
    const itemHeight = 32; //This should match the height of each item in the listbox
    const { virtualizerLength, bufferItems, bufferSize, scrollRef } =
      useStaticVirtualizerMeasure({
        defaultItemSize: itemHeight,
        direction: "vertical",
      });
    // resetting the options on blur
    const onBlur = () => {
      setMatchingOptions([...options])
    };

  const [matchingOptions, setMatchingOptions] = React.useState([...options]);
  const [customSearch, setCustomSearch] = React.useState<string | undefined>();

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
    } else {      
      setCustomSearch(data.optionText);
    }
    onSelectOptions(data.selectedOptions);
  };

  const CustomOption = ({ text }) => {
      return <span>{`No results found for ${text}`}</span>;
   };
  
  useEffect(() => {
    if(options?.length > 0)
    setMatchingOptions([...options]);
  },[options]);


  useEffect(() => {
    if(!disabled){
      if (comboBoxRef.current) {
        comboBoxRef.current.focus();
      }
    }
  },[disabled])

  useEffect(() => {
   if(defaultSelectedOption?.length > 0){
     setSelectedOptions(defaultSelectedOption);
   }
  },[defaultSelectedOption])

    return (
      <FluentProvider
        theme={props.theme === "dark" ? webDarkTheme : webLightTheme}
      >
        <Combobox
          id={`${comboId}`}
          listbox={{ ref: scrollRef, className: styles.listbox }}
          aria-label={intl.formatMessage(messages.comboLabel)}
          placeholder={selectedOptions?.length > 0 ? selectedOptions[0] : value}
          onBlur={onBlur}
          onChange={onChange}
          onOptionSelect={onOptionSelect}
          selectedOptions={selectedOptions}
          disabled={disabled}
          autoComplete='off'
        >
          <Virtualizer
            numItems={matchingOptions.length || 1}
            virtualizerLength={virtualizerLength}
            bufferItems={bufferItems}
            bufferSize={bufferSize}
            itemSize={itemHeight}
          >
            {(index) => {
              if (matchingOptions.length === 0) {
                return (
                  <Option className={styles.option} aria-posinset={1} aria-setsize={1}>
                    {intl.formatMessage(messages.noResultFound)}
                  </Option>
                );
              } else {
                const option = matchingOptions[index];
                return (
                  <Option
                    className={styles.option}
                    aria-posinset={index}
                    aria-setsize={matchingOptions.length}
                    key={option.key}
                    text={`${option.text} (${option.key})`}
                    value={option.key}
                  >
                    {option.text} ({option.key})
                  </Option>
                );
              }
            }}
          </Virtualizer>
        </Combobox>
      </FluentProvider>
    );
}

export const MctComboBox =injectIntl(MctComboBoxComponent) ;
