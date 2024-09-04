import { useMemo, useEffect, useCallback, useState } from "react";
import * as React from "react";
import { AgGridReact } from "ag-grid-react";
//import "ag-grid-enterprise";
//import "ag-grid-community";
import agGrid from "ag-grid-community/styles/ag-grid.css";
import agTheme from "ag-grid-community/styles/ag-theme-alpine.css";
import { getCurrentTheme } from "../../../utils";
import { Styled } from "direflow-component";
import {
  CommandBar,
  FocusTrapZone,
  classNamesFunction,
} from "@fluentui/react";
import { injectIntl } from "react-intl";
import { IGridProps } from "./oseGrid.types";
import { getStyles } from "./oseGrid.styles";
import { ColDef, GridOptions, ModuleRegistry } from "ag-grid-community";
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { messages } from "./oseGrid.messages";
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { LicenseManager } from "ag-grid-enterprise";
import { fetchConfigKey } from "../../../store/actions/config.actions";
import { useAppSelector,useAppDispatch } from "../../../store/hooks";
ModuleRegistry.registerModules([ExcelExportModule]);     


   
const getClassNames = classNamesFunction<any, any>();
let classes: any;

const OseGridContainer: React.FC<IGridProps> = ({
  grRef,
  parentContext,
  columnDefinitions,
  rowDataProps,
  gridOptions,
  classNameGrid,
  gridName,
  heightWidthStyle,
  pagination=false,
  requiredSideBar=false,
  rowClassRules,
  autoSizeStrategy,
  getRowStyle,
  handleSelectionChanged,
  rowSelection,
  actionItems,
  placeholder,
  intl,
}) => {
  const gridStyle = useMemo(() => heightWidthStyle || { width: "100%", height: "100%" }, []);
  const theme = getCurrentTheme(parentContext);
  classes = getClassNames(getStyles(theme));
  const gridRef = grRef;
  const GRID_CELL_CLASSNAME = "ag-cell";
  const dispatch = useAppDispatch();
 // const gridConfigvalue = true;
  const [rowData, setRowData] = useState([]);

  const gridConfigvalue = useAppSelector((state) => state.configReducer.config);
  useEffect(() => {
    if (!gridConfigvalue && parentContext) {
      dispatch(fetchConfigKey(parentContext, "grid"));
    }
  }, [parentContext]);

  useEffect(() => {
    if (gridConfigvalue) {
      const key = gridConfigvalue;
      LicenseManager.setLicenseKey(key);
      setRowData(rowDataProps);
    }
  }, [gridConfigvalue, rowDataProps]);

  const defaultColDef: ColDef = useMemo(() => {
    return {
      filter: 'agSetColumnFilter',
      // suppressMenu: true,
      // suppressHeaderKeyboardEvent: (event) =>
      //   suppressHeaderKeyboardEvent(event, GRID_HEADER_CELL_CLASSNAME),
      suppressKeyboardEvent: (event) =>
        suppressHeaderKeyboardEvent(event, GRID_CELL_CLASSNAME),
    };
  }, []);

  const getAllFocusableElementsOf = (el) => {
    return Array.from(
      el.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((focusableEl: any) => {
      return focusableEl.tabIndex !== -1;
    });
  };
  const getEventPath = (event) => {
    const path = [];
    let currentTarget = event.target;
    while (currentTarget) {
      path.push(currentTarget);
      currentTarget = currentTarget.parentElement;
    }
    return path;
  };

  const isTabForward = (key, shiftKey) => key === "Tab" && !shiftKey;
  const isTabBackward = (key, shiftKey) => key === "Tab" && shiftKey;
  
  const focusLastChild = (elements) => {
    const lastChild = elements[elements.length - 1];
    if (lastChild) {
      lastChild.focus();
    }
  };

  const suppressHeaderKeyboardEvent = ({ event }, type: string) => {
    const { key, shiftKey } = event;
    const path = getEventPath(event);
    const eGridCell = path.find((el) => el.classList?.contains(type));
    if (!eGridCell) return false;
    if (key === "Enter") {
      return;
    }

    const focusableChildrenElements = getAllFocusableElementsOf(eGridCell);

    if (!(isTabForward(key, shiftKey) || isTabBackward(key, shiftKey)) || focusableChildrenElements.length === 0) { 
      return false;
    }

    const isLastChildFocused = focusableChildrenElements[focusableChildrenElements.length - 1] === document.activeElement;
    const isFirstChildFocused = focusableChildrenElements[0] === document.activeElement;

    if (isTabForward(key, shiftKey) && isLastChildFocused) {
      return false;
    }

    if (isTabBackward(key, shiftKey)) {
      const cellHasFocusedChildren = eGridCell.contains(document.activeElement) && eGridCell !== document.activeElement;

      if (!cellHasFocusedChildren) {
        focusLastChild(focusableChildrenElements);
        event.preventDefault();
      }

      if (!isFirstChildFocused) {
        return true;
      }
    }

    return true;
  };
  
  let mergedGridDefaultcolumn: ColDef;
  if (gridOptions?.defaultColDef) {
    mergedGridDefaultcolumn = {
      ...defaultColDef,
      ...gridOptions.defaultColDef,
    };
  } else {
    mergedGridDefaultcolumn = { ...defaultColDef };
  }

  const onGridReady = useCallback((e) => {
    if (gridName) gridRef.current?.api?.setGridAriaProperty("label", gridName);
    let tablec = document.querySelectorAll('.ag-center-cols-viewport');
    tablec?.forEach(element => {
      element['tabIndex'] = 0;
    });
 
    // const headerCells = document.querySelectorAll(".ag-header-cell-sortable");
    // headerCells.forEach((headerCell) => {
    //   headerCell.removeAttribute("aria-description");
    // });
    grRef.current?.api?.setGridAriaProperty("busy", "true");
    // const demoClasses = document.querySelectorAll(
    //   ".ag-center-cols-clipper .ag-cell-wrapper"
    // );
    // demoClasses.forEach((element) => {
    //   element["ariaHidden"] = "false";
    // });

    // gridRef.current.api.refreshCells();
    //grRef.current.api.setSideBarVisible(false);
    //gridRef.current.api.setSideBarVisible(false);
  }, []);


  const defaultGridOptions: GridOptions = {
    animateRows: true,
    suppressRowHoverHighlight: true,
    suppressContextMenu: true,
    sortingOrder: ["asc", "desc"],
    suppressCsvExport: true,
    defaultColDef: mergedGridDefaultcolumn,
    onGridReady: onGridReady,
  };

  const mergedGridOptions: GridOptions = {
    ...gridOptions,
    ...defaultGridOptions,
  };

  mergedGridOptions.suppressMenuHide = true;
  const onFilterTextBoxChanged = useCallback((event) => {
    if(gridRef?.current){
      gridRef?.current?.api?.setGridOption(
        'quickFilterText',
        event?.target?.value
      );
    }
  }, []);
  //TODO sidebar has accessibility issues, once fixed can be used.
  const sideBar = useMemo(() => {     
    if (!requiredSideBar) {
      return null;
    }
    return {
            toolPanels: [
                {
                  id: 'columns',
                  labelDefault: 'Columns',
                  labelKey: 'columns',
                  iconKey: 'columns',
                  toolPanel: 'agColumnsToolPanel',
                  toolPanelParams: {
                    suppressRowGroups: true,
                    suppressValues: true,
                    suppressPivots: true,
                    suppressPivotMode: true,
                    suppressColumnFilter: false,
                    suppressColumnSelectAll: true,
                    suppressColumnExpandAll: true,
                  },
                },
              ],
              defaultToolPanel: 'columns',
          };
  }, []);
  const renderGrid = () => {
    return (
      <Styled styles={[agGrid, agTheme]}>
        <div
          id="grid-wrapper"
          style={gridStyle}
          className={`${classes.agGridContainer} ${theme.name === "dark" ? "ag-theme-alpine-dark" : "ag-theme-alpine"}`}        >
          <div
            style={gridStyle}
            className={`${theme.name === "dark" ? "ag-theme-alpine-dark":"ag-theme-alpine"}`}
          > 

            <div className={classes.actionAndSearchBar} >    
              <div className={classes.commandBarDiv}>
                  <CommandBarActions actionItems={actionItems} /> 
              </div>
              <div className={classes.searchBoxDiv}>
                <SearchBox className={classes.searchBox} placeholder={`${intl.formatMessage(messages.searchPlaceholderText)} ${placeholder ? ' For ' + placeholder : ''}`} onChange={onFilterTextBoxChanged} />
              </div>
            </div>     
            {/* {rowData && rowData.length > 0 ? ( */}
              <AgGridReact
                gridOptions={mergedGridOptions}
                ref={gridRef}
                rowData={rowDataProps}
                columnDefs={columnDefinitions}
                className={classNameGrid}
                pagination={pagination}
                //sideBar={sideBar}
                domLayout='normal'
                rowClassRules={rowClassRules}
                autoSizeStrategy={autoSizeStrategy}
                getRowStyle={getRowStyle}
                onSelectionChanged={handleSelectionChanged}
                rowSelection={rowSelection}
              ></AgGridReact>
            {/* ) : null} */}
          </div>
        </div>
      </Styled>
    );
  };

  return <>{renderGrid()}</>;
};
export const OseGrid = injectIntl(OseGridContainer);


export const CommandBarActions = ({actionItems}) => {
  const [enableFocusTrap, setEnableFocusTrap] = React.useState(false);

  return ( 
    <div tabIndex={-1}>
      <FocusTrapZone  disabled={!enableFocusTrap}>
          <CommandBar
            items={actionItems}
          />
        </FocusTrapZone>
    </div>
  );
};