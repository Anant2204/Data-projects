import React, { useState, CSSProperties } from "react";
import { Stack, Text, Icon, TextField } from "@fluentui/react";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  IColumn,
} from "@fluentui/react/lib/DetailsList";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import { Link } from "@fluentui/react/lib/Link";
import { IStackStyles } from "@fluentui/react/lib/Stack";
import { TooltipHost } from "@fluentui/react/lib/Tooltip";
import "./TicketDetails.css"

const TicketDetails = ({
  data,
  status,
  targetSystem,
  createdOn,
  searchText,
}) => {
  const [listData, setData] = useState(data);
  type MyColumn = IColumn & { minWidth: number };
  const [columns, setColumns] = useState<MyColumn[]>([
    {
      key: "RequestID",
      name: "Request ID",
      fieldName: "ticketNumber",
      minWidth: 100,
      maxWidth: 100,
      isResizable: true,
      isSorted: false,
      isSortedDescending: false,
    },
    {
      key: "Title",
      name: "Title",
      fieldName: "title",
      minWidth: 150,
      maxWidth: 150,
      isResizable: true,
      isSorted: false,
      isSortedDescending: false,
    },
    {
      key: "Description",
      name: "Description",
      fieldName: "input",
      minWidth: 400,
      // maxWidth: 330,
      isResizable: true,
      isSorted: false,
      isSortedDescending: false,
    },
    {
      key: "Status",
      name: "Status",
      fieldName: "status",
      minWidth: 70,
      // maxWidth: 100,
      isResizable: true,
      isSorted: false,
      isSortedDescending: false,
    },
    {
      key: "CreatedOn",
      name: "Created On",
      fieldName: "createdDate",
      minWidth: 150,
      // maxWidth: 130,
      isResizable: true,
      isSorted: false,
      isSortedDescending: false,
    },
    {
      key: "TargetSystem",
      name: "Target System",
      fieldName: "targetSystem",
      minWidth: 150,
      // maxWidth: 150,
      isSorted: false,
      isSortedDescending: false,
    },
  ]);

  const onColumnClick = (ev, column) => {
    const newColumns = columns.slice();
    const currentColumn = newColumns.filter((col) => column.key === col.key)[0];

    newColumns.forEach((col) => {
      if (col !== currentColumn) {
        col.isSorted = false;
        col.isSortedDescending = false;
      }
    });

    currentColumn.isSorted = !currentColumn.isSorted;
    currentColumn.isSortedDescending = !currentColumn.isSortedDescending;

    // Perform sorting logic on your data based on the current column
    // For example, assuming your data is an array of objects
    const sortedData = [...data].sort((a, b) => {
      const aValue = a[currentColumn.fieldName];
      const bValue = b[currentColumn.fieldName];

      // Implement sorting logic based on the data type of the column
      // Example for string sorting:
      return currentColumn.isSortedDescending
        ? bValue.localeCompare(aValue)
        : aValue.localeCompare(bValue);
    });

    setColumns(newColumns);
    setData(sortedData); // Update your data state with the sorted data
  };

  const getStatusCellStyle = (status): CSSProperties => {
  
      if(status === "Closed")
      {
        return { backgroundColor: "#D7EBFF", color: "#00326B" };
      }
      else{
        return { backgroundColor: "#DFF6DD", color: "#114B2A" };
      }
  };

  const formatDate = (createdDate) => {
    const dateObject = new Date(createdDate);
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const year = dateObject.getFullYear().toString().slice(-2);
    if (createdDate != "") return `${month}/${day}/${year}`;
    else return "";
  };



  const renderLink = (item) => (
    <Link href={item.ticketLink} target="_blank" rel="noopener noreferrer">
      {item.title}
    </Link>
  );


  

  let filteredData;

  if (status === "All") {
    // Display all data when status is 'All'
    filteredData = listData;

  } else if (status === "Closed") {
    // Display both 'Resolved' and 'Active' data together
    filteredData = listData.filter((item) => item.status === "Closed");    
  }
  else if (status === "NonClosed") {
    // Display both 'Resolved' and 'Active' data together
    filteredData = listData.filter((item) => item.status !== "Closed");    
  }
  else {
    // Filter data based on the specified status
    filteredData = listData.filter((item) => item.status === status);
  }

  if (targetSystem !== "") {
    filteredData = filteredData.filter(
      (item) => item.targetSystem.toLowerCase() === targetSystem.toLowerCase()
    );
  }

  if (
    createdOn != null &&
    createdOn != "" &&
    createdOn != undefined &&
    createdOn != "undefined"
  ) {
    filteredData = filteredData.filter((item) => {
      // Assuming item.createdDate is a string or can be converted to a string
      const itemCreatedDate = new Date(item.createdDate);
      // console.log(itemCreatedDate.toLocaleDateString());
      // console.log(createdOn.toLocaleDateString());
      // Check if createdOn is not null or undefined before using toLocaleDateString
      if (createdOn && itemCreatedDate) {
        return (
          itemCreatedDate.toLocaleDateString() ===
          createdOn.toLocaleDateString()
        );
      }

      return false;
    });
  }

  filteredData = filteredData.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  );


  // If no data found, add a dummy item for an empty row
  if (filteredData.length === 0) {
    filteredData.push({
      ticketNumber: "",
      title: "",
      input: "No ticket found",
      status: "",
      createdDate: "",
      targetSystem: "",
    });
  }

     // Define the onRenderItemColumn function
     const onRenderItemColumn = (item, index, column) => {
      const colValue = item[column.fieldName || ""];

      if (column.key === "Title") {
          return renderLink(item);
      }

      if (column.key === "Status") {
          if (colValue !== "") {
              const statusStyle = getStatusCellStyle(colValue);

              return (
                  <Stack
                      horizontal
                      verticalAlign="center"
                      tokens={{ childrenGap: 5 }}
                      styles={{
                          root: {
                              backgroundColor: statusStyle.backgroundColor,
                              padding: "5px",
                              borderRadius: "2px",
                              width: 74,
                              height: 26,
                              color: statusStyle.color,
                          },
                      }}
                  >
                      <Icon
                          iconName={
                              colValue !== "Closed"
                                  ? "CircleRing"
                                  : "Completed"
                          }
                          style={{ marginRight: 0 }}
                      />
                      <span>{colValue}</span>
                  </Stack>
              );
          }
      }

      if (column.key === "CreatedOn") {
          return formatDate(colValue);
      }

      if (column.key === "Description") {
          return (
              <TooltipHost content={colValue}>
                  <div>{colValue}</div>
              </TooltipHost>
          );
      }

      if (column.key === "TargetSystem") {
          return (
              <div
                  role="columnheader"
                  className="custom-column-header"
              >
                  <div>{colValue}</div>
              </div>
          );
      }

      return colValue !== undefined ? colValue.toString() : "";
  };

  return (
    <DetailsList  
      items={filteredData}
      columns={columns}
      setKey="set"
      layoutMode={DetailsListLayoutMode.justified}
      selectionMode={SelectionMode.none}
      className="list-ticket-details custom-details-list"
      onColumnHeaderClick={onColumnClick}
      styles={{ root: { fontSize: 14, fontWeight: 400, width: '96%',overflowX: "auto" } }}
      onRenderItemColumn={onRenderItemColumn} 
    />
  );
};

export default TicketDetails;