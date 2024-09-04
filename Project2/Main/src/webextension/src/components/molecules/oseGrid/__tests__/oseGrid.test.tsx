import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../utils/customRender";
import { parentContext } from "../../../../utils/testMockData";
import { OseGrid } from "../oseGrid";
import { fireEvent, waitFor } from "@testing-library/react";
import { ColDef, GridOptions } from "ag-grid-community";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock("../../../../utils/httpUtils", async () => ({
  getConsumptionAPI: jest.fn(() => [{ test: "test" }]),
}));

jest.mock("../../../../store/selectors/config.selector", () => ({
  getConfig: jest.fn().mockReturnValue("DummyKey"),
}));
// Mocking column definitions and row data
const columnDefinitionsMock = [
  { headerName: "Column 1", field: "col1" },
  { headerName: "Column 2", field: "col2" },
];

const rowDataPropsMock = [
  { col1: "Value 1-1", col2: "Value 1-2" },
  { col1: "Value 2-1", col2: "Value 2-2" },
];

describe("OseGrid", () => {
  test("renders the grid with correct data", () => {
    const { container } = renderWithProviders(
      <OseGrid
        grRef={React.createRef()}
        parentContext={parentContext}
        columnDefinitions={columnDefinitionsMock}
        rowDataProps={rowDataPropsMock}
        gridOptions={{}}
        classNameGrid="grid-test"
      />,
      {
        store: mockStore({
          config: {
            isLoading: false,
            error: null,
            config: "dummyliscencekey",
          },
        }),
      }
    );

    expect(container.querySelectorAll(".ag-cell-value").length).toBe(4);
    expect(container.querySelector(".ag-cell-value").textContent).toBe(
      "Value 1-1"
    );
    expect(
      container.querySelector(".ag-cell-value[role='gridcell']").textContent
    ).toBe("Value 1-1");
  });

  test("renders the grid with no data", () => {
    const columnDefinitionsMock = [
      { headerName: "Column 1", field: "col1" },
      { headerName: "Column 2", field: "col2" },
    ];

    const rowDataPropsMock = [
      { col1: "Value 1-1", col2: "Value 1-2" },
      { col1: "Value 2-1", col2: "Value 2-2" },
    ];
    const { container } = renderWithProviders(
      <OseGrid
        grRef={React.createRef()}
        parentContext={parentContext}
        columnDefinitions={columnDefinitionsMock}
        rowDataProps={[]}
        gridOptions={{}}
        classNameGrid="grid-test"
      />,
      {
        store: mockStore({
          config: {
            isLoading: false,
            error: null,
            config: "dummyliscencekey",
          },
        }),
      }
    );

    expect(container.querySelectorAll(".ag-cell-value").length).toBe(0);
  });

  test("should sort data by ID in ascending order", () => {
    const rowDataProps = [
      { id: 1, name: "John Doe", age: 30 },
      { id: 2, name: "Jane Smith", age: 25 },
      // Add more test data here...
    ];

    const columnDefinitions = [
      { headerName: "ID", field: "id", sortable: true },
      { headerName: "Name", field: "name", sortable: true },
      { headerName: "Age", field: "age", sortable: true },
    ];
    const { getByText, getByRole, container } = renderWithProviders(
      <OseGrid
        grRef={React.createRef()}
        parentContext={parentContext}
        rowDataProps={rowDataProps}
        columnDefinitions={columnDefinitions}
        gridOptions={{}}
        classNameGrid="grid-test"
      />,
      {
        store: mockStore({
          config: {
            isLoading: false,
            error: null,
            config: "dummyliscencekey",
          },
        }),
      }
    );

    const idHeaderCell = getByText("ID");

    fireEvent.click(idHeaderCell);

    const firstCell = getByRole("gridcell", { name: "1" });

    expect(firstCell.textContent).toBe("1");
    const descArrowIcon = container.querySelector(".ag-icon.ag-icon-asc");

    expect(descArrowIcon).toBeInTheDocument();
  });

  test("should sort data by ID in descending order", () => {
    const rowDataProps = [
      { id: 1, name: "John Doe", age: 30 },
      { id: 2, name: "Jane Smith", age: 25 },
      // Add more test data here...
    ];

    const columnDefinitions = [
      { headerName: "ID", field: "id", sortable: true },
      { headerName: "Name", field: "name", sortable: true },
      { headerName: "Age", field: "age", sortable: true },
    ];
    const { container, getByText, getByRole } = renderWithProviders(
      <OseGrid
        grRef={React.createRef()}
        parentContext={parentContext}
        rowDataProps={rowDataProps}
        columnDefinitions={columnDefinitions}
        gridOptions={{}}
        classNameGrid="grid-test"
      />,
      {
        store: mockStore({
          config: {
            isLoading: false,
            error: null,
            config: "dummyliscencekey",
          },
        }),
      }
    );

    const idHeaderCell = getByText("ID");

    fireEvent.click(idHeaderCell);

    const firstCellDesc = getByRole("gridcell", { name: "2" });
    expect(firstCellDesc.textContent).toBe("2");
    const descArrowIcon = container.querySelector(".ag-icon.ag-icon-desc");

    expect(descArrowIcon).toBeInTheDocument();
  });

  test("should suppress header keyboard events and highlight cell", async () => {
    const rowDataProps = [
      { id: 1, name: "John Doe", age: 30 },
      { id: 2, name: "Jane Smith", age: 25 },
    ];

    const columnDefinitions = [
      { headerName: "ID", field: "id", sortable: true },
      { headerName: "Name", field: "name", sortable: true },
      { headerName: "Age", field: "age", sortable: true },
    ];
    const mockSuppressKeyboardEvent = jest.fn((event) => true);
    const mockMergedGridDefaultcolumn: ColDef = {
      suppressMenu: true,
      sortable: true,
      suppressHeaderKeyboardEvent: mockSuppressKeyboardEvent,
    };

    const defaultGridOptions: GridOptions = {
      animateRows: true,
      suppressRowHoverHighlight: true,
      suppressContextMenu: true,
      suppressCsvExport: true,
      defaultColDef: mockMergedGridDefaultcolumn,
    };

    const { container } = renderWithProviders(
      <OseGrid
        grRef={React.createRef()}
        parentContext={parentContext}
        rowDataProps={rowDataProps}
        columnDefinitions={columnDefinitions}
        gridOptions={defaultGridOptions}
        classNameGrid="grid-test"
      />,
      {
        store: mockStore({
          config: {
            isLoading: false,
            error: null,
            config: "dummyliscencekey",
          },
        }),
      }
    );

    const agContainer = container.getElementsByClassName(
      "ag-center-cols-container"
    )[0];

    const agRow = agContainer.getElementsByClassName("ag-row")[0];
    const agCell = agRow.getElementsByClassName("ag-cell");
    (agCell[0] as HTMLDivElement).focus();
    fireEvent.keyDown(agCell[0], { key: "Tab" });
    expect(container).toBeDefined();

    await waitFor(() => {
     expect(agCell[1]).toHaveClass("ag-cell-focus");
    });
  });

  test("should suppress header keyboard events and highlight header", async () => {
    const rowDataProps = [
      { id: 1, name: "John Doe", age: 30 },
      { id: 2, name: "Jane Smith", age: 25 },
    ];

    const columnDefinitions = [
      { headerName: "ID", field: "id", sortable: true },
      { headerName: "Name", field: "name", sortable: true },
      { headerName: "Age", field: "age", sortable: true },
    ];

    const defaultColDefMock: ColDef = {
      suppressMenu: true,
      sortable: true,
    };

    const mockSuppressKeyboardEvent = jest.fn((event) => true);

    const mockMergedGridDefaultcolumn: ColDef = {
      suppressMenu: true,
      sortable: true,
      suppressKeyboardEvent: mockSuppressKeyboardEvent,

      ...defaultColDefMock,
    };

    const defaultGridOptions: GridOptions = {
      animateRows: true,
      suppressRowHoverHighlight: true,
      suppressContextMenu: true,
      suppressCsvExport: true,
      defaultColDef: mockMergedGridDefaultcolumn,
      onGridReady: jest.fn(),
    };

    const { container } = renderWithProviders(
      <OseGrid
        grRef={React.createRef()}
        parentContext={parentContext}
        rowDataProps={rowDataProps}
        columnDefinitions={columnDefinitions}
        gridOptions={defaultGridOptions}
        classNameGrid="grid-test"
      />,
      {
        store: mockStore({
          config: {
            isLoading: false,
            error: null,
            config: "dummyliscencekey",
          },
        }),
      }
    );

    const agContainer = container.getElementsByClassName("ag-header-container");
    const agRow = agContainer[0].getElementsByClassName("ag-header-row-column");
    const agHeader = agRow[0].getElementsByClassName("ag-header-cell");

    (agHeader[0] as HTMLDivElement).focus();

    fireEvent.keyDown(agHeader[0], { key: "Tab" })
    await waitFor(() => {
      expect(agHeader[1].classList.contains('ag-header-active')).toBe(true);

    });
  });

  test("container loading with default options", async () => {
    // Render your component
    const rowDataProps = [
      { id: 1, name: "John Doe", age: 30 },
      { id: 2, name: "Jane Smith", age: 25 },
    ];

    const columnDefinitions = [
      { headerName: "ID", field: "id", sortable: true },
      { headerName: "Name", field: "name", sortable: true },
      { headerName: "Age", field: "age", sortable: true },
    ];

    const mockSuppressHeaderKeyboardEvent = jest.fn((event) => true);

    const mockSuppressKeyboardEvent = jest.fn((event) => true);

    const defaultColDefMock: ColDef = {
      suppressMenu: true,
      sortable: true,
      suppressHeaderKeyboardEvent: mockSuppressHeaderKeyboardEvent,
      suppressKeyboardEvent: mockSuppressKeyboardEvent,
    };

    const mockMergedGridDefaultcolumn: ColDef = {
      suppressMenu: true,
      sortable: true,
      ...defaultColDefMock,
    };

    const mockOnGridReady = jest.fn();

    const defaultGridOptions: GridOptions = {
      animateRows: true,
      suppressRowHoverHighlight: true,
      suppressContextMenu: true,
      suppressCsvExport: true,
      defaultColDef: mockMergedGridDefaultcolumn,
      onGridReady: mockOnGridReady,
    };
    const gridRef = React.createRef<any>();

    const { container } = renderWithProviders(
      <OseGrid
        grRef={gridRef}
        parentContext={parentContext}
        rowDataProps={rowDataProps}
        columnDefinitions={columnDefinitions}
        gridOptions={defaultGridOptions}
        classNameGrid="grid-test"
        gridName={"testGrid"}
      />,
      {
        store: mockStore({
          config: {
            isLoading: false,
            error: null,
            config: "dummy",
          },
        }),
      }
    );

    gridRef.current.api.gridOptionsService.gridOptions.onGridReady();
    expect(container).toBeDefined();
  });
});
