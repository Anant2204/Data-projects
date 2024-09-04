import React from "react";
import { getCurrentTheme } from "../../../utils";
import { classNamesFunction } from "@fluentui/react";
import { injectIntl } from "react-intl";
import { getStyles } from "./oseGroupCards.styles";
import { IComponentProps } from "./oseGroupCards.types";
const getClassNames = classNamesFunction<any, any>();
let classes: any;


const GroupedListWithCards: React.FC<IComponentProps> = ({ parentContext, groupName, listData, render }) => {
  const theme = getCurrentTheme(parentContext);
  classes = getClassNames(getStyles(theme));

  return (
    <div className={classes.Container}>
      <div className={classes.groupHeaderLabel} tabIndex={0} data-testid={'group-name'}>
        {groupName}
      </div>
      <div className={classes.cardsContainer}>
        {render(listData)}
      </div>
    </div>
  );
};

export const OseGroupCards= injectIntl(GroupedListWithCards);
