import { IBreadcrumbItem } from "@fluentui/react";
import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { IConsumptionPageProps } from "./consumption.types";
import { getStyles } from "./styles";
import ConsumptionList from "../../shared/components/consumptionList";
import { getCurrentTheme } from "../../../utils";
import { classNamesFunction } from "office-ui-fabric-react";
import PageLayout from "../../layouts/osePageLayout/osePageLayout";
import { OseToastContainer } from "../../molecules/";
import { messages } from "./consumption.messages";
import { IHeaderState } from "../../layouts/osePageLayout/osePageLayout.types";
import { clearMessagesForComponent } from "../../../store";
import {  useDispatch } from "react-redux";
import { consumptionPage } from "../../../constants/componentCodes.constant";

let classes: any;
const getClassNames = classNamesFunction<any, any>();
const ConsumptionEstimates: React.FC<IConsumptionPageProps> = (props) => {
  const { parentContext, intl } = props;
  const theme = getCurrentTheme(parentContext);
  const dispatch = useDispatch();

  classes = getClassNames(getStyles(theme));

  const headerState: IHeaderState = {
    leftSection: {
      headerText: intl.formatMessage(messages.myConsumptionEstimatesTitle),
      headerTopLinkText: "",
      subTitleList:[],
      subHeaderList: [],
      isBackButtonVisible: false,
    },
  };
  useEffect(() => {
      return () => {     
        dispatch(clearMessagesForComponent({
            componentCode: consumptionPage
        }));

      };
    }, []);

  const breadCrumbItems: IBreadcrumbItem[] = [
    {
      text: intl.formatMessage(messages.breadCrumbHome),
      key: "home",
      onClick: () => console.log("Home clicked"),
    },
    {
      text: intl.formatMessage(messages.myConsumptionEstimatesTitle),
      key: "estimates",
    },
  ];

  const renderMain = () => {
    return (
      <div className={classes.mainContent}>
        <ConsumptionList
          opportunityId={null}
          parentContext={parentContext}
        />
      </div>
    );
  };
  return (
    <PageLayout
      breadCrumbItems={breadCrumbItems}
      parentContext={parentContext}
      headerState={headerState}
    >
      <>
        <OseToastContainer />
        {renderMain()}
      </>
    </PageLayout>
  );
};

export const Consumption = injectIntl(ConsumptionEstimates);


