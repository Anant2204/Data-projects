import React, { useEffect, useRef, useState } from "react";
import {
  ComboBox,
  Dropdown,
  IComboBoxStyles,
  SelectableOptionMenuItemType,
  Toggle
} from '@fluentui/react';
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  fetchManagerData, fetchManagersListSuccess,
} from "../../../../store/actions/comman.action";
import { injectIntl } from "react-intl";
import { messages } from "./managerComboBox.messages";
import { IMctMangerComboProps } from "./managerComboBox.types";
import { getStyles } from "./managerComboBox.styles"
import { classNamesFunction } from "office-ui-fabric-react";
import { getCurrentTheme } from "../../../../utils";
import { IManager } from "../../../../interfaces";
import { MctComboBox } from "../../../molecules/mctComboBox/mctComboBox";

// Optional styling to make the example look nicer

let classes: any;
const getClassNames = classNamesFunction<any, any>();

const ManagerComboBox: React.FC<IMctMangerComboProps> = (props) => {
  const { parentContext, intl, pageTitle,selectedOption, disabled ,setToggleCompleteHierarchy,defaultSelectedManagers } = props;
  // const [selectedManager, setSelectedManager] = React.useState([]);
  const [rowManagerData, setRowManagerData] = React.useState([]);
  const managerData = useAppSelector((state) => state?.commonReducer?.managerData);

  const getKeyValue = (rowData: IManager[]): { key: string; text: string }[] => {
    const arr: { key: string; text: string, itemType: number }[] = [];
    for (const key of rowData) {
      const obj = {
        key: key.alias,
        text: key.fullName,
        itemType : 0
      };
      arr.push(obj);
    }
    return arr;
  };

  // useEffect(() => {
  //   if (parentContext !== null) {
  //     const filteringMgrNames: string[] = selectedManager.map((item) => item.key);
  //     selectedOption(filteringMgrNames);
     
  //   }
  // }, [parentContext,selectedManager]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (parentContext !== null) {
      dispatch(fetchManagerData(parentContext, false));
    }
    return () => {
      dispatch(fetchManagersListSuccess(""));
    };
  }, [parentContext]);
  
  useEffect(() => {
    if (Array.isArray(managerData?.managers) && managerData?.managers?.length > 0) {  
      setRowManagerData(getKeyValue(managerData?.managers))
    }
  }, [managerData?.managers]);

  const theme = getCurrentTheme(parentContext);
  classes = getClassNames(getStyles(theme));

  function _onChange(ev: React.MouseEvent<HTMLElement>, checked?: boolean) {
    dispatch(fetchManagerData(parentContext,checked));
    setToggleCompleteHierarchy(checked);
  }

  return (
    <div className={classes.rootcontainer}>
      {
        pageTitle &&  (
          <h1>{pageTitle}</h1>
        )
      }
      <div className={classes.comboContainer}>
        <span className={classes.comboTitle}>
          <h2>{intl.formatMessage(messages.managerComboTitle)}</h2> 
        </span>
        <MctComboBox
          disabled={disabled}
          options={rowManagerData}
          theme={theme.name}
          placeholder={intl.formatMessage(messages.managerComboPlaceholder)}
          onSelectOptions={selectedOption}
          comboId="managerCombo"
          defaultSelectedOption={defaultSelectedManagers}
        />
      </div>
      <div>
        <Toggle
          label={intl.formatMessage(messages.showCompleteHierarchy)}
          onText={intl.formatMessage(messages.onText)}
          offText={intl.formatMessage(messages.offText)}
          inlineLabel
          onChange={_onChange}
          disabled={disabled}
          className={classes.toggleHover}
        />
      </div>
    </div>
  );
};

export const ManagerCombo = injectIntl(ManagerComboBox);