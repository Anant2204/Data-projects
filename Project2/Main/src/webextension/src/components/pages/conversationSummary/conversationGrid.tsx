import { Stack, TooltipHost, classNamesFunction } from "@fluentui/react";
import React, { useRef } from "react";
import { OseGrid } from "../../molecules/oseGrid/oseGrid";
import { ColDef, GridOptions } from "ag-grid-community";
import { messages } from "./conversationSummary.messages";
import { injectIntl } from "react-intl";
import { getCurrentTheme } from "../../../utils";
import { getStyles } from "./conversationSummary.styles";
import { IGridHeightWidthStyle } from "../../molecules/oseGrid/oseGrid.types";
import JoiningSvgIcon from "../../../images/joiningSvgIcon.svg";
import LeaveSvgIcon from "../../../images/leaveSvgIcon.svg";
import TaxonomyImpact from "../../../images/taxonomyImpact.svg";
import { useAppSelector } from "../../../store/hooks";
import { IConversationSummary } from "./conversationSummary.types";

let classes: any;

//TODO move to types
interface IGridProps {
  parentContext: any;
  rowGridData:IConversationSummary[];
  intl: any;
  gridName: any;
  placeholder:string;
}
const ConversationGridComponent = (props: IGridProps) => {
  const { parentContext, rowGridData, intl, gridName, placeholder } = props;
  //Styles
  const getClassNames = classNamesFunction<any, any>();
  const theme = getCurrentTheme(parentContext);
  const styles = getStyles(theme);
  classes = getClassNames(styles);
  //to show icon
  const ShowConditionalIcon = (params) => {
    let iconName = null;
    if (params.data.hasTaxonomyChange) {
      iconName = <div className={`${classes.gridIconWrapper} ${classes.taxonomyIconBackground}`} ><TaxonomyImpact aria-label={intl.formatMessage(messages.taxonomyImpactText)} /></div>
    }
    if (gridName === 'cyGrid' && params.data.isMoving) {
      iconName = <div className={`${classes.gridIconWrapper} ${classes.leavingIconBackground}`} ><LeaveSvgIcon aria-label={intl.formatMessage(messages.leavingText)}  /></div>
    } else if (gridName === 'fyGrid' && params.data.isMoving) {
      iconName = <div className={`${classes.gridIconWrapper} ${classes.joingIconBackground}`} ><JoiningSvgIcon aria-label={intl.formatMessage(messages.joiningText)} /></div>
    }
    return (
      <span className={classes.rowColor}>
        {iconName}
      </span>
    );
  };
   
  //Grid Columns
  const colsDef:ColDef<any, any>[] = [
    {
      field: "isMovingHasTaxonomyChange",  
      headerName: '',
      width: 55,
      cellStyle: { textOverflow: 'clip' },
      suppressSizeToFit: true ,
      cellRenderer: (params) => ShowConditionalIcon(params),
      sortable: true,
      suppressMovable: true,
      filter:false,
      suppressMenu: true, 
      sort: 'desc' 
    },  
    {
      field: "fullName",
      headerName: intl.formatMessage(messages.cyGridColNameFullName),
      // width: 150,
      sortable: true,
      suppressMovable: true,
      cellRenderer: (params) => <TooltipHost content={params.data.alias}>{params.data.fullName}</TooltipHost>,
    },
    {
      field: "roleSummary",
      headerName: gridName === 'cyGrid' ? intl.formatMessage(messages.cYRoleSummary) : intl.formatMessage(messages.fyGridColNameRoleSummary),
      width: 300,
      sortable: true,
      suppressMovable: true,
    },
    {
      field: "q1",
      headerName: intl.formatMessage(messages.cyGridColNameQ1),
      width: 150,
      sortable: true,
      suppressMovable: true,
    },
    {
      field: "q2",
      headerName: intl.formatMessage(messages.cyGridColNameQ2),
      width: 150,
      sortable: true,
      suppressMovable: true,
    },
    //add other columns here
  ];

  const gridOptions: GridOptions = {
    suppressBrowserResizeObserver: true,
    //scrollbarWidth: 7,
  };
  const autoSizeStrategy = {
    type: 'fitGridWidth',
    defaultMinWidth: 200,
    suppressBrowserResizeObserver: true,
};
  const gridRef = useRef();
  const getRowStyle = (params) => {     // Customize the row style based on the data 
    let backgroundColor =  { background: '' }
    if (params.data.hasTaxonomyChange && theme.name === 'default') {
      backgroundColor.background = 'rgb(255 247 228)'
    }
     if(gridName==='cyGrid' && params.data.isMoving && theme.name === 'default'){
      backgroundColor.background = 'rgb(255 243 244)'
      }else if(gridName==='fyGrid' && params.data.isMoving && theme.name === 'default'){
        backgroundColor.background = 'rgb(239 255 237)'
    }
    return backgroundColor;  
  }
    
  return (
    <>
        <div style={{height:"50vh", minHeight: "400px" } }>   
        {rowGridData?.length >= 0 ?        
         <OseGrid
            parentContext={parentContext}
            columnDefinitions={colsDef}
            getRowStyle={getRowStyle}
            grRef={gridRef}
            rowDataProps={rowGridData}
            //heightWidthStyle={heightWidthStyle}
            gridName={placeholder}
            gridOptions={gridOptions}
            pagination={true}
            // requiredSideBar={true}
            autoSizeStrategy={autoSizeStrategy}
            placeholder={placeholder}
          />
          : null}
        </div>
    </>
  );
};

export const ConversationGrid =  injectIntl(ConversationGridComponent);
