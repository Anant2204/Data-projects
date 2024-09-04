import { useMemo, useRef, useEffect, useCallback, useState } from "react";
import * as React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community";
import agGrid from "ag-grid-community/styles/ag-grid.css";
import agTheme from "ag-grid-community/styles/ag-theme-alpine.css";
import { getCurrentTheme } from "../../../utils";
import { Styled } from "direflow-component";
import { classNamesFunction } from "@fluentui/react";
import { injectIntl } from "react-intl";
import { IGridProps } from "./oseGrid.types";
import { getStyles } from "./oseGrid.styles";
import { ColDef, GridOptions } from "ag-grid-community";
import { useDispatch, useSelector } from "react-redux";
import { LicenseManager } from "ag-grid-enterprise";
import { fetchConfigKey, getConfig } from "../../../store";

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
}) => {
  const gridStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const theme = getCurrentTheme(parentContext);
  const prevCellRef = useRef(null);
  const dispatch = useDispatch();
  classes = getClassNames(getStyles(theme));
  const gridRef = grRef;
  const GRID_HEADER_CELL_CLASSNAME = "ag-header-cell";
  const GRID_CELL_CLASSNAME = "ag-cell";
  const gridConfigvalue = useSelector(getConfig);
  const [rowData, setRowData] = useState([]);

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
      suppressMenu: true,
      sortable: true,
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

  const suppressHeaderKeyboardEvent = ({ event }, type: string) => {
    const { key, shiftKey } = event;
    const path = getEventPath(event);
    const isTabForward = key === "Tab" && !shiftKey;
    const isTabBackward = key === "Tab" && shiftKey;
    const eGridCell = path.find((el) => el.classList?.contains(type));
    if (!eGridCell) return false;
    if (key === "Enter") {
      return;
    }
    

    const focusableChildrenElements = getAllFocusableElementsOf(eGridCell);

    const lastCellChildEl: any =
      focusableChildrenElements[focusableChildrenElements.length - 1];
    const firstCellChildEl: any = focusableChildrenElements[0];

    if (
      !(isTabForward || isTabBackward) ||
      focusableChildrenElements.length === 0
    ) {
      return false;
    }

    const isLastChildFocused = lastCellChildEl === document.activeElement;
    const isFirstChildFocused = firstCellChildEl === document.activeElement;

    if (isTabForward && isLastChildFocused) {
      return false;
    }

    if (isTabBackward) {
      const cellHasFocusedChildren =
        eGridCell.contains(document.activeElement) &&
        eGridCell !== document.activeElement;

      if (!cellHasFocusedChildren && lastCellChildEl) {
        lastCellChildEl.focus();
        event.preventDefault();
      }

      if (!isFirstChildFocused) {
        return true;
      }
    }

    return true;
  };
  let mergedGridDefaultcolumn: ColDef;

  if (gridOptions && gridOptions.defaultColDef) {
    mergedGridDefaultcolumn = {
      ...defaultColDef,
      ...gridOptions.defaultColDef,
    };
  } else {
    mergedGridDefaultcolumn = { ...defaultColDef };
  }



  const onGridReady = useCallback(() => {
    if (gridName) gridRef.current.api.setGridAriaProperty("label", gridName);
    const headerCells = document.querySelectorAll(".ag-header-cell-sortable");
    headerCells.forEach((headerCell) => {
      headerCell.removeAttribute("aria-description");
    });
    grRef.current.api.setGridAriaProperty("busy", "true");
    const demoClasses = document.querySelectorAll(
      ".ag-center-cols-clipper .ag-cell-wrapper"
    );
    demoClasses.forEach((element) => {
      element["ariaHidden"] = "false";
    });

    gridRef.current.api.refreshCells();
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

  const renderGrid = () => {
    return (
      <Styled styles={[agGrid, agTheme]}>
        <div
          id="grid-wrapper"
          style={gridStyle}
          className={`${classes.agGridContainer} ag-theme-alpine`}
        >
          <div style={gridStyle} className={`ag-theme-alpine`}>
            {rowData && rowData.length > 0 ? (
              <AgGridReact
                gridOptions={mergedGridOptions}
                ref={gridRef}
                rowData={rowDataProps}
                columnDefs={columnDefinitions}
                className={classNameGrid}
              ></AgGridReact>
            ) : null}
          </div>
        </div>
      </Styled>
    );
  };

  return <>{renderGrid()}</>;
};
export const OseGrid = injectIntl(OseGridContainer);
