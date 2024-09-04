import React, { useEffect, useState } from "react";
import { IConversationSummary, IMctPageProps } from "./conversationSummary.types";
import {
  classNamesFunction,
} from "@fluentui/react";
import { injectIntl } from "react-intl";
import { getCurrentTheme } from "../../../utils";
import { getStyles } from "./conversationSummary.styles";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { level } from "../../../constants/componentCodes.constant";
import { clearMessages } from "../../../store/actions/commonMessages.actions";
import { ConversationGrid } from "./conversationGrid";
import { ManagerCombo } from "../../shared/components/managerComboBox/managerComboBox";
import JoiningSvgIcon from "../../../images/joiningSvgIcon.svg";
import CySvgIcon from "../../../images/cySvgIcon.svg";
import FySvgIcon from "../../../images/fySvgIcon.svg";
import LeaveSvgIcon from "../../../images/leaveSvgIcon.svg";
import TaxonomyImpact from "../../../images/taxonomyImpact.svg";

import {
  OsePageCommonError,
  ShimmerSkeleton,
} from "../../molecules";
import { messages } from "./conversationSummary.messages";
import { 
  fetchFySummaryCurrentData, 
  fetchFySummaryFutureData, 
  fetchFySummaryStatisticsData,
  clearConversationSummaryData 
} from "../../../store/actions/conversationSummary.action";

let classes: any;
const getClassNames = classNamesFunction<any, any>();

const ConversationSummaryComponent: React.FC<IMctPageProps> = (props) => {
  //Props and Hooks
  const { parentContext, intl } = props;
  const [selectedManagers, setSelectedManagers] = React.useState<string[]>([]);
  const [toggleCompleteHierarchy, setToggleCompleteHierarchy] = React.useState(false);
  const [showShimmer, setShowShimmer] = React.useState(true);

  const dispatch = useAppDispatch();
  //Theme related
  const theme = getCurrentTheme(parentContext);
  const styles = getStyles(theme);
  classes = getClassNames(styles);

  
  const managerData = useAppSelector(
    (state) => state?.commonReducer?.managerData
  );
  const isManagerDataLoading = useAppSelector(
    (state) => state?.commonReducer?.isLoading
  );
  const fySummaryCurrentDataIsLoading = useAppSelector(
    (state) => state?.conversationSummaryReducer?.fySummaryCurrentDataIsLoading 
  ); 
  const fySummaryFuturetDataIsLoading = useAppSelector(
    (state) => state?.conversationSummaryReducer?.fySummaryFuturetDataIsLoading
  );
  const fySummaryStatisticsDataIsLoading = useAppSelector(
    (state) => state?.conversationSummaryReducer?.fySummaryStatisticsDataIsLoading
  );

  //page error check consts  

  useEffect(()=> {
    const showShimmerFlag = fySummaryCurrentDataIsLoading==false && fySummaryFuturetDataIsLoading===false && fySummaryStatisticsDataIsLoading===false && isManagerDataLoading==false;  
      if(selectedManagers.length>0){
        setShowShimmer(!showShimmerFlag)
      }
  }, [fySummaryCurrentDataIsLoading, fySummaryFuturetDataIsLoading, fySummaryStatisticsDataIsLoading, isManagerDataLoading])

  const pageName = window.location.pathname.substring(1); 
  const [pageCommonError, setPageCommonError] = useState([]);
  const initialStatisticsObject = [
    {"statisticsValue": 0 ,"statisticsText":intl.formatMessage(messages.cyTileText),"statisticsIcon": CySvgIcon, "iconBackgroundclass": 'cyIconBackground',"tileBackgroundclass": 'cyTileBackground'},
    {"statisticsValue": 0 ,"statisticsText":intl.formatMessage(messages.leavingText),"statisticsIcon": LeaveSvgIcon, "iconBackgroundclass": 'leavingIconBackground',"tileBackgroundclass": 'leavingTileBackground'},
    {"statisticsValue": 0 ,"statisticsText":intl.formatMessage(messages.joiningText),"statisticsIcon": JoiningSvgIcon, "iconBackgroundclass": 'joingIconBackground',"tileBackgroundclass": 'joiningTileBackground'},
    {"statisticsValue": 0 ,"statisticsText":intl.formatMessage(messages.fyTileText),"statisticsIcon": FySvgIcon , "iconBackgroundclass": 'fyIconBackground',"tileBackgroundclass": "fyTileBackground"},
    {"statisticsValue": 0 ,"statisticsText":intl.formatMessage(messages.fyTileTaxonomyImpact),"statisticsIcon": TaxonomyImpact , "iconBackgroundclass": 'fyIconBackground',"": "fyTileBackgroundTexonomy"},
  ]
  const [statistics, setStatistics] = useState(initialStatisticsObject);
  const pageError = useAppSelector((state) => state.commonMessagesReducer.messages);
  const fySummaryCurrentData: IConversationSummary[] = useAppSelector(
    (state) => state?.conversationSummaryReducer?.fySummaryCurrentData
  );
  const fySummaryFutureData: IConversationSummary[] = useAppSelector(
    (state) => state?.conversationSummaryReducer?.fySummaryFuturetData
  );
  const fySummaryStatisticsData: { "cyTeam": 0, "fyTeam": 0, "joining": 0, "leaving": 0, "fyTaxonomyChange": 0 } = useAppSelector(
    (state) => state?.conversationSummaryReducer?.fySummaryStatisticsData
  );

  useEffect(() => {
    if (pageError && pageError.length > 0) {
      const filteredArray = pageError.filter(
        (error) =>
          error.level.type === level.Page &&
          (error.level.componentCode === pageName ||
            error.level.componentCode === "all")
      );
      if(filteredArray.length>0){
        setShowShimmer(false)
      }
      setPageCommonError(filteredArray);
    }
  }, [pageError]);

  useEffect(() => {
    if (managerData) {
      // We add this condition to determine whether the selected manager exists within the managerData. 
      // If it does, we need to make API calls using that selected manager. 
      // If it doesn't exist, we then check if the defaultSelectedManagerAlias is present. 
      // If it is, we make the API calls using that default manager alias.
      const hasManagerWithAlias = 
            selectedManagers?.length > 0 &&
            managerData?.managers?.some(manager => manager.alias.includes(selectedManagers[0]));
      if(selectedManagers?.length > 0 && hasManagerWithAlias){
        dispatch(fetchFySummaryCurrentData(parentContext, selectedManagers,toggleCompleteHierarchy));
        dispatch(fetchFySummaryFutureData(parentContext, selectedManagers,toggleCompleteHierarchy));
        dispatch(fetchFySummaryStatisticsData(parentContext, selectedManagers,toggleCompleteHierarchy));
      } else {
        if (managerData?.defaultSelectedManagerAlias) {
          setSelectedManagers([managerData?.defaultSelectedManagerAlias])
        } else {
          managerData?.managers?.length > 0 && setSelectedManagers([managerData?.managers[0]?.alias])
        }
      }
    }
  }, [managerData])
  //on load dispatch for grid and statistics for all
  useEffect(() => {
    if (parentContext && selectedManagers?.length>0) {
        dispatch(fetchFySummaryCurrentData(parentContext, selectedManagers,toggleCompleteHierarchy));
        dispatch(fetchFySummaryFutureData(parentContext, selectedManagers,toggleCompleteHierarchy));
        dispatch(fetchFySummaryStatisticsData(parentContext, selectedManagers,toggleCompleteHierarchy));
    }
  }, [selectedManagers]);

  useEffect(() => {
    return () => {
      dispatch(clearMessages());
      dispatch(clearConversationSummaryData());
      setStatistics(initialStatisticsObject);
    };
  },[parentContext])
  useEffect(() => {     
    // setStatistics   with prevous data
    if (fySummaryStatisticsData) {
      setStatistics([
        {
          statisticsValue: fySummaryStatisticsData?.cyTeam,
          statisticsText: intl.formatMessage(messages.cyTileText),
          statisticsIcon: CySvgIcon,
          iconBackgroundclass: "",
          tileBackgroundclass: "cyTileBackground",
        },
        {
          statisticsValue: fySummaryStatisticsData?.leaving,
          statisticsText: intl.formatMessage(messages.leavingText),
          statisticsIcon: LeaveSvgIcon,
          iconBackgroundclass: "",
          tileBackgroundclass: "leavingTileBackground",
        },
        {
          statisticsValue: fySummaryStatisticsData?.joining,
          statisticsText: intl.formatMessage(messages.joiningText),
          statisticsIcon: JoiningSvgIcon,
          iconBackgroundclass: "",
          tileBackgroundclass: "joiningTileBackground",
        },
        {
          statisticsValue: fySummaryStatisticsData?.fyTeam,
          statisticsText: intl.formatMessage(messages.fyTileText),
          statisticsIcon: FySvgIcon,
          iconBackgroundclass: "",
          tileBackgroundclass: "fyTileBackground",
        },
        {
          statisticsValue: fySummaryStatisticsData?.fyTaxonomyChange || 0,
          statisticsText: intl.formatMessage(messages.fyTileTaxonomyImpact),
          statisticsIcon: TaxonomyImpact,
          iconBackgroundclass: "",
          tileBackgroundclass: "fyTileBackgroundTexonomy",
        },
      ]);
    }
  }, [fySummaryStatisticsData]);

  const selectedOption = (listOfSelected: string[]) => {
    if (listOfSelected?.length > 0) {
      setSelectedManagers(listOfSelected);
    } 
  }; 
  
  const TilesInfo = ({ statisticsText, statisticsValue, StatisticsIcon, iconBackgroundclass, tileBackgroundclass }) => {
    return (
      <div
        className={`${classes.tileStatistic} ${tileBackgroundclass === 'fyTileBackgroundTexonomy' ? classes.taxonomyImpactTile: ''} ${classes[tileBackgroundclass]}`}
      >
        <span className={classes.tileNumber}> {statisticsValue} </span>
        <span className={classes.tileTitle}> {statisticsText} </span>
        <div
          className={`${classes.tileIconWrapper} ${tileBackgroundclass === 'fyTileBackgroundTexonomy' ? classes.taxonomyIconWrapper: ''}  ${classes[iconBackgroundclass]}`}
        >
          <StatisticsIcon />
        </div>
      </div>
    );
  }     

  const renderContent = () => {
    return (
    <div className={`${classes.layoutContainer}`} style={{display: !showShimmer ? 'block': 'none'}}> 
        {pageCommonError && pageCommonError.length > 0 ? (
          <div className={`col-12`}>
            <OsePageCommonError
              parentContext={parentContext}
              description={pageCommonError[0].message}
            />
          </div>
        ) : (
          <main tabIndex={-1}>
            <div className={classes.mainContainer}>

                <div className={classes.columnsHeaderContainer} >
                  <div className={classes.pageHeader}>
                    <div className={classes.managerComboStyle}>
                      <h1>
                        {intl.formatMessage(messages.conversationsSummaryTitle)}
                      </h1>
                    </div>
                  </div>

                  <div className={classes.columnsContainer}>
                    <ManagerCombo
                      parentContext={parentContext}
                      selectedOption={selectedOption}
                      disabled={isManagerDataLoading}
                      setToggleCompleteHierarchy={setToggleCompleteHierarchy}
                      defaultSelectedManagers={selectedManagers}
                    />
                  </div>
                
                </div>

                <div className={classes.columnsContainer}>
                     <ul className={classes.tileRows}>
                     {
                        statistics.map((item, index) => {
                          return (
                            <li aria-label={item.statisticsText} key={item.statisticsText} className={classes.gridItem}>
                              <TilesInfo
                                statisticsValue={item.statisticsValue}
                                statisticsText={item.statisticsText}
                                StatisticsIcon={item.statisticsIcon}
                                iconBackgroundclass={item.iconBackgroundclass}
                                tileBackgroundclass={item.tileBackgroundclass}
                              />
                            </li> 
                          );
                        })
                      } 
                    </ul>
                       
                  </div>
                
            
                <div className={classes.columnsContainer} >
                  <div className={classes.middleContentLeftColumn}>
                    <div className={classes.row}>
                      <div className={classes.fyTeamHeading} aria-label={`${intl.formatMessage(messages.cyTeamTitle)} (${fySummaryCurrentData?.length ? fySummaryCurrentData?.length : 0})`}>
                          <div className={`${classes.iconWrapper} ${classes.cyIconBackground}`} > 
                            <CySvgIcon />
                          </div>
                          <div className={classes.teamTexStyle} >
                          <h2>{`${intl.formatMessage(messages.cyTeamTitle)} (${fySummaryCurrentData?.length ? fySummaryCurrentData?.length : 0})`}</h2> 
                          </div>
                        </div>
                      <ConversationGrid placeholder={intl.formatMessage(messages.cyTeamTitle)} gridName={'cyGrid'} parentContext={parentContext} rowGridData={fySummaryCurrentData} />   
                    </div>
                  </div>
                  <div className={classes.middleContentLeftColumn}>
                    <div className={classes.row}>
                      <div className={classes.fyTeamHeading} aria-label={`${intl.formatMessage(messages.fyTeamTitle)} (${fySummaryFutureData?.length ? fySummaryFutureData?.length : 0})`} >
                        <div className={`${classes.iconWrapper} ${classes.fyIconBackground}`} >  
                          <FySvgIcon />
                        </div>

                        <div className={classes.teamTexStyle} >
                        <h2>{`${intl.formatMessage(messages.fyTeamTitle)} (${fySummaryFutureData?.length ? fySummaryFutureData?.length : 0})`}</h2> 
                        </div>
                      </div>
                      <div className={classes.row}>
                        <ConversationGrid placeholder={intl.formatMessage(messages.fyTeamTitle)} gridName={'fyGrid'} parentContext={parentContext} rowGridData={fySummaryFutureData} />
                      </div>
                    </div>
                  </div>
                </div>

            </div>
          </main>
        )}
      </div> 
    );
  };
  return (
    <div>
      {showShimmer && (
         <ShimmerSkeleton parentContext={parentContext} />  
      )}
      {renderContent()} 
    </div>
  );
};

export const ConversationSummary = injectIntl(ConversationSummaryComponent);
