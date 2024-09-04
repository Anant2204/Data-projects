import React, { useCallback, useEffect, useRef, useState } from "react";
import { OseGrid } from "../../molecules/oseGrid/oseGrid";
import { GridOptions } from "ag-grid-community";
import { messages } from "./createConversationScript.messages";
import { injectIntl } from "react-intl";
import { getCurrentTheme, formatDateAndTime, postAPI } from "../../../utils";
import { getStyles } from "./createConversationScript.styles";
import { Checkbox } from '@fluentui/react';
import { IScriptScenarios } from "../../../interfaces/ApiResponseModel/ICreateConversationScript";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { ICommandBarItemProps, Stack, PrimaryButton, classNamesFunction } from "@fluentui/react";
import * as XLSX from 'xlsx';
import { toast } from "react-toastify";
import { fetchTaxonomyScriptContentData } from "../../../store/actions/createConversationScript.action";
import { IPermission } from "../../../interfaces";
import { clearMessages } from "../../../store/actions/commonMessages.actions";
import { OseNoResultFound } from "../../molecules/oseNoResultFound/oseNoResultFound";
import { string } from "prop-types";
let classes: any;

//TODO move to types
interface IGridProps {
  parentContext: any;
  rowGridData: IScriptScenarios[];
  intl: any;
  handleSelectionChanged?: (event: any) => void;
  isPageReadOnly: boolean;
  setSaveLoadingFlag: (flag: boolean) => void; 
}

const CreateConversationGridComponent = (props: IGridProps) => {
  const { parentContext, rowGridData, intl, handleSelectionChanged, isPageReadOnly, setSaveLoadingFlag } = props;
  //Styles
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [rowData, setRowData] = useState([]);
  const fileInputRef = useRef(null);
  const dispatch = useAppDispatch();

  const getClassNames = classNamesFunction<any, any>();
  const theme = getCurrentTheme(parentContext);
  const styles = getStyles(theme);
  classes = getClassNames(styles);
  const isLoading = useAppSelector(
    (state) => state?.createConversationSriptReducer?.isLoading
  );


  //Grid Columns
  const colsDef = [
    {
      field: "action",
      headerName: intl.formatMessage(messages.scriptAction),
      width: 150,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
    },
    {
      field: "scriptTitle",
      headerName: intl.formatMessage(messages.scriptScriptTitle),
      width: 200,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
    },
    {
      field: "cyOrg",
      headerName: intl.formatMessage(messages.scriptCyOrg),
      width: 250,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
    },

    {
      field: "cyRoleSummary",
      headerName: intl.formatMessage(messages.scriptCyRoleSummary),
      width: 250,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
    },
    {
      field: "cyQ1",
      headerName: intl.formatMessage(messages.scriptCyQ1),
      width: 150,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
    },
    {
      field: "cyQ2",
      headerName: intl.formatMessage(messages.scriptCyQ2),
      width: 150,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
    },
    {
      field: "cyIncentivePlan",
      headerName: intl.formatMessage(messages.cyIncentivePlan),
      width: 150,
      sortable: true,
      suppressMovable: true, 
      headerClass: "excelHeaderStyle",
    },
    {
      field: "fyOrg",
      headerName: intl.formatMessage(messages.scriptfyOrg),
      width: 250,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
    },
    {
      field: "fyRoleSummary",
      headerName: intl.formatMessage(messages.scriptFyRoleSummary),
      width: 250,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
    },
    {
      field: "fyQ1",
      headerName: intl.formatMessage(messages.scriptFyQ1),
      width: 150,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
    },
    {
      field: "fyQ2",
      headerName: intl.formatMessage(messages.scriptFyQ2),
      width: 150,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
    },
    {
      field: "fyIncentivePlan",
      headerName: intl.formatMessage(messages.fyIncentivePlan),
      width: 150,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
    },  
    {
      field: "scriptContent",
      headerName: "Script Content",
      width: 150,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle", 
    },
    {
      field: "exclusions",
      headerName: "Exclusion Orgs",
      width: 150,
      sortable: true,
      suppressMovable: true,
       valueFormatter: (params) => params !=null &&   Array.isArray(params.data.exclusions)?   params.data.exclusions.map(obj => obj.alias).join(', ') : params.data.exclusions,
       headerClass: "excelHeaderStyle",
    }
    //add other columns here
  ];
  //console.log(params);

  const gridOptions: GridOptions = {
    suppressBrowserResizeObserver: true,
    suppressRowClickSelection: true,
    //scrollbarWidth: 7,
    excelStyles: [
      {
        id: 'excelHeaderStyle',
        font: {
          bold: true,
        },
      },
    ],
  };
  const autoSizeStrategy = {
    type: 'fitGridWidth',
    defaultMinWidth: 200,
    suppressBrowserResizeObserver: true,
  };
  function getBoolean(id: string) {
    return !!(document.querySelector('#' + id) as HTMLInputElement);
  }

  function getParams() {
    return {
      skipColumnHeaders: getBoolean('Action'),
    };
  }
  const gridRef = React.createRef<any>();

  useEffect(() => {
    setRowData(rowGridData);
  }, [rowGridData])

  useEffect(() => {
    if (parentContext) {
      dispatch(fetchTaxonomyScriptContentData(parentContext));
    }
    return () => {
      dispatch(clearMessages());
    };
  }, [parentContext]);

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    try {
      if (event.target.files && event.target.files.length > 0) {
        setSelectedFile(event.target.files[0]);
      }
      const file = event.target.files?.[0];
      const reader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = (e) => {
        setRowData([]);
        const binaryStr = e.target?.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const columns = {
          A: "",
          B: "scriptTitle",
          C: "cyOrg",
          D: "cyRoleSummary",
          E: "cyQ1",
          F: "cyQ2",
          G: "cyIncentivePlan",
          H: "fyOrg",
          I: "fyRoleSummary",
          J: "fyQ1",
          K: "fyQ2",
          L: "fyIncentivePlan",
          M: "scriptContent",
          N: "exclusions"
        };
        const excelData = [];
        // Start at the 2nd row - the first row contains headers
        let rowIndex = 2;
        // Iterate over the worksheet, extracting the expected columns
        while (worksheet['A' + rowIndex]) {
          const row = {};
          Object.keys(columns).forEach((column) => {
            row[columns[column]] = worksheet[column + rowIndex]?.w || "";
          });
          excelData.push(row);
          rowIndex++;
        }
        excelData.forEach(row => {
          let exclusionObjectList = [];
          if (row.exclusions != null && row.exclusions != "" && row.exclusions != undefined) {
            let exclutionsStrArr = row.exclusions.split(",");
            exclutionsStrArr.forEach(exclution => {
              exclusionObjectList.push({
                alias: exclution,
                fullName: ""
              }); 
            })
            row.exclusions = exclusionObjectList;
            row.exclusionsForUpload = exclutionsStrArr;
          }else{
            row.exclusions = [];
            row.exclusionsForUpload = [];
          } 
        });
        
       let temp1 =[];
       rowGridData.forEach(element => {
        element.exclusionsForUpload = element.exclusions.length >0 ? element.exclusions?.map(obj1 => obj1.alias) : []; 
      });
       setRowData((prevRowData) => [...rowGridData, ...excelData]);
      };
    } catch (err) {
      console.error('Error reading Excel file:', err);
    }
  };

  const handleSave: any = async () => {
    try {
      const url = `/v1/taxonomyScriptContent/import`;

      let formattedData = [];
      rowData.forEach(s => {
        let newObject = {
          id: s.id || 0,
          scriptContent: s.scriptContent || '',
          fyOrg: s.fyOrg || '',
          fyRoleSummary: s.fyRoleSummary || '',
          fyQ1: s.fyQ1 || '',
          fyQ2: s.fyQ2 || '',
          cyOrg: s.cyOrg || '',
          cyRoleSummary: s.cyRoleSummary || '',
          cyQ1: s.cyQ1 || '',
          cyQ2: s.cyQ2 || '',
          title: s.scriptTitle || '',
          exclusion: s.exclusionsForUpload, 
          cyIncentivePlan: s.cyIncentivePlan || '',
          fyIncentivePlan: s.fyIncentivePlan || '',
        };
        formattedData.push(newObject);
      });

      const postData = formattedData;
      setSaveLoadingFlag(true)

      const response = await postAPI(url, postData, parentContext);
      if (response && response.status == 200 && response.data) {
        // parentContext(true);
        dispatch(clearMessages());
        setSelectedFile(null);
        setSaveLoadingFlag(false)
        toast.success('Records are successfully inserted');
      }
      else {
        setSaveLoadingFlag(false)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [createButtonClick, setCreateButtonClick] = React.useState(false);

  const actionItems: ICommandBarItemProps[] = [
    {
      key: 'Download',
      text: 'Download Excel',
      iconProps: { iconName: 'ExcelDocument' },
      onClick: () => {
        gridRef?.current?.api?.exportDataAsExcel(getParams());
      },
    },
    {
      key: 'upload',
      text: selectedFile ? `${selectedFile.name}` : 'Upload Excel',
      iconProps: { iconName: 'ExcelDocument' },
      onClick: handleUpload,
    },
    {
      key: 'save',
      text: 'Save',
      iconProps: { iconName: 'Save' },
      onClick: handleSave,
      disabled: false
    },
  ];

  const duplicates = [];
  const nonDuplicates = [];
  rowData?.forEach((obj: IScriptScenarios, index, self) => {
    const isUniqueData = index === self.findIndex((t: IScriptScenarios) =>
    (t.cyOrg === obj.cyOrg &&
      t.fyOrg === obj.fyOrg &&
      t.cyRoleSummary === obj.cyRoleSummary &&
      t.fyRoleSummary === obj.fyRoleSummary &&
      t.cyQ1 === obj.cyQ1 &&
      t.cyQ2 === obj.cyQ2 &&
      t.fyQ1 === obj.fyQ1 &&
      t.fyQ2 === obj.fyQ2 && 
      t.cyIncentivePlan === obj.cyIncentivePlan &&
      t.fyIncentivePlan === obj.fyIncentivePlan
    )
    );
    if (isUniqueData) {
      obj.action = 'Update';
      nonDuplicates.push(obj);
    } else {

      obj.action = 'Duplicate';
      duplicates.push(obj);
    }
  });

  const getRowStyles = (params: any) => {
    if (duplicates.includes(params.data)) {
      return { border: '1px solid #FF9A00' };
    } 
  };

  return (
    <>
      <Stack style={{ height: "80vh" }}>
        <input
          ref={fileInputRef}
          type="file"
          id="fileInput"
          accept=".xlsx,.xls"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {isLoading ?
          <OseGrid
            parentContext={parentContext}
            columnDefinitions={colsDef}
            grRef={gridRef}
            rowDataProps={null}
            //heightWidthStyle={heightWidthStyle}
            gridName="createConversationGrid"
            gridOptions={gridOptions}
            pagination={true}
            requiredSideBar={true}
          />
          : null}
   
        {!isLoading && rowData?.length > 0 ?
          <OseGrid
            parentContext={parentContext}
            columnDefinitions={colsDef}
            grRef={gridRef}
            rowDataProps={rowData}
            //heightWidthStyle={heightWidthStyle}
            gridName={'createConversationGrid'}
            gridOptions={gridOptions}
            pagination={true}
            // requiredSideBar={true}
            autoSizeStrategy={autoSizeStrategy}
            handleSelectionChanged={handleSelectionChanged}
            rowSelection="multiple"
            actionItems={actionItems}

            getRowStyle={getRowStyles}
          />
      
          : null}

         {!isLoading && rowData?.length === 0 && (
         <div className={classes.uploadScriptButton}>
              <PrimaryButton onClick={() => handleUpload()}>
                {intl.formatMessage(messages.scriptCreateScript)}
              </PrimaryButton>
            </div>
            
       
        )}


      </Stack>
    </>
  );
};

export const CreateConversationGrid = injectIntl(CreateConversationGridComponent);


