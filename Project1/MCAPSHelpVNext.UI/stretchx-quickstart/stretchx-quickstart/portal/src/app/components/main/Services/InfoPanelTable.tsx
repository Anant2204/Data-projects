import React, { useState, useEffect } from "react";
import { Dropdown, MessageBar, MessageBarType, PrimaryButton, Shimmer, ShimmerElementType, Stack, Text, TextField } from "@fluentui/react";
import { getConsumptionAPI } from "../../../utils/httpUtils";
import { ServiceContext } from "@msx/platform-services";
import "./InfoPanelTable.css";
import { Pivot, PivotItem } from '@fluentui/react';
import * as Constants from '../../../utils/constants';
import { useDispatch } from "react-redux";
import { SETChileComponentName, SETHasServiceRequestTypeLogData, SETLogEventData, SETServiceRequestTypeLogData, SETIsCustomeLog } from "../../../../core/store";
const InfoPanelTable = ({ handlePivotChange, serviceId, userId, serviceName}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestTypeOptions, setRequestTypeOptions] = useState([]);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [selectedOptionText, setSelectedOptionText] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [responseData, setResponseData] = useState([]);
  const [showDetailsList, setShowDetailsList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const context = React.useContext(ServiceContext);
  const reduxDispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await getConsumptionAPI(
        `/api/Services/GetAllServicesGroups/${serviceId}/${userId}`,
        context.authClient
      );
      const result = await response.data;
      setData(result);
      if(serviceName.toLowerCase().includes("ecif")){
        fetchRequestTypeData()
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [serviceId]);

  const fetchRequestTypeData = async () => {
    try {
      const response = await getConsumptionAPI(
        `/api/Services/GetPredefinedRequestType`,
        context.authClient
      );
      console.log('response Options:', response);
      const formattedOptions = response?.data?.map(option => ({
        key: option.id,
        text: option.requestTypeName
      }));

      setRequestTypeOptions(formattedOptions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const renderShimmer = () => (
    <Shimmer
      shimmerElements={[
        { type: ShimmerElementType.line, height: 300, width: "100%" },
        { type: ShimmerElementType.gap, width: "2%" },
        { type: ShimmerElementType.line, height: 300, width: "98%" },
      ]}
    />
  );

  const handleRequestTypeChange = (event, item) => {
    setSelectedOptionId(item.key);
    setSelectedOptionText(item.text);
  };

  const handleSearchChange = (event, newValue) => {
    setSearchValue(newValue);
  };

  const handleSubmit = async () => {
    if (selectedOptionId) {
      setIsLoading(true);
      try {
          // Start Event Logging //
          await reduxDispatch(SETChileComponentName('Service Detail Panel for '+ serviceName));

          await reduxDispatch(SETHasServiceRequestTypeLogData(true));
          await reduxDispatch(SETLogEventData(
          {
          elementName:"Request Type Submit",
          elementId:"",
          action:"click",
          message : 'User click on Request Type Submit',
          }
          ));
          await reduxDispatch(SETServiceRequestTypeLogData(
          {ServiceName: serviceName,
          RequestType: selectedOptionText ||"",
          SearchTerm: (selectedOptionId === 3 || selectedOptionId === 4) ? (searchValue.trim() || "") : "", 
          }
          ));
          await reduxDispatch(SETIsCustomeLog(true));
          // End Event Logging //
        let response:any;
        if((selectedOptionId === 3 || selectedOptionId === 4) && searchValue.trim() !== '') {
          response = await getConsumptionAPI(
            `/api/Services/GetEcifStatusWithSearch/${selectedOptionId}?search=${searchValue}`,
            context.authClient
          );
        }
        if(selectedOptionId === 1 || selectedOptionId === 2){
          response = await getConsumptionAPI(
            `/api/Services/GetEcifStatus/${selectedOptionId}`,
            context.authClient
          );
        }     

        const result = await response.data;
        setResponseData(result);
        setShowDetailsList(true);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error('No option selected');
    }
  };

  const generateColumns = () => {
    if (responseData.length === 0) return [];
    console.log("generateColumns",responseData);
    const firstItem = responseData[0];
    return Object.keys(firstItem).map(key => ({
      key: key,
      name: key,
      fieldName: key,
      isResizable: true
    }));
  };

  return (
    <Stack>
      {loading ? (
        <>
          {renderShimmer()}
        </>
      ) : (
        <>
          {typeof data === 'object' && Object?.keys(data)?.length > 0 ?
            <Pivot onLinkClick={handlePivotChange}>
              <PivotItem headerText="Services" itemKey="Services">
                {Object?.keys(data)?.map((CommonFields, index) => (
                  <React.Fragment key={CommonFields}>
                    {
                      data[CommonFields]?.AboutService && data[CommonFields]?.AboutService !== 0 && (
                        <tr>
                          <td className="tableCell" style={{ padding: "10px", paddingLeft:"16px" }}>
                            {data[CommonFields]?.AboutService}
                          </td>
                        </tr>
                      )
                    }
                  </React.Fragment>
                ))}
              <div className="tableContainer">
                <table>
                  <thead className="tableHeader">
                    <tr>
                      <th className="tableheading">
                        <Text variant="xLarge" block style={{ color: "white", fontSize: '14px' }} className="serviceGroupText">
                          Service Groups
                        </Text>
                      </th>
                      <th className="tableheading">
                        <Text variant="xLarge" block style={{ color: "white", fontSize: '14px' }} className="serviceGroupText requestTypeHeader">
                          Request Types
                        </Text>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="tableSpacer"></tr>
                    {Object?.keys(data)?.filter(serviceGroup => serviceGroup !== "CommonFields")?.map((serviceGroup, index) => (
                      <React.Fragment key={serviceGroup}>
                       <tr className="tableSpacer"></tr>
                        <tr>
                          <td className="tableCell">
                            <Text variant="xLarge" block className="serviceGroupText">
                              {serviceGroup}
                            </Text>
                            <div
                              className="serviceGroupDescriptionText"
                              dangerouslySetInnerHTML={{ __html: data[serviceGroup].ServiceGroupDescription }}
                            ></div>
                            
                          </td>
                          <td>
                            <ul >
                              {data[serviceGroup]?.RequestTypeName?.map((requestType, idx) => (
                                <li key={idx}>
                                  <Text variant="medium" className="requestTypeText">
                                    {requestType}
                                  </Text>
                                </li>
                              ))}
                            </ul>
                          </td>
                       
                        </tr>
                        <tr className="tableSpacer"></tr>
                      </React.Fragment>
                    ))}
                    <tr className="tableSpacer"></tr>
                   
                  </tbody>
                </table>
              </div>
            </PivotItem>
            {Object?.keys(data)?.some(CommonFields => data[CommonFields]?.Relatedinformation && data[CommonFields]?.Relatedinformation !== 0) && (
            <PivotItem headerText="Related Information" itemKey="Related Information">
              {Object?.keys(data)?.map((CommonFields, index) => (
                <React.Fragment key={CommonFields}>
                  <tr>
                    <td className="tableCell">
                      <div
                        className="serviceGroupDescriptionText"
                        dangerouslySetInnerHTML={{ __html: data[CommonFields].Relatedinformation }}
                      ></div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </PivotItem>
            )}
            
            {serviceName.toLowerCase().includes("ecif") && <PivotItem headerText="Get ECIF Status" itemKey="Get ECIF Status">
              <div style={{margin: '0 0 0 10px'}}>
                <p className="p-element">Please select from the below request types to retrieve status</p>
                <Stack className="ecif-stack" horizontal tokens={{ childrenGap: 8 }}>
                  <Dropdown
                    className="ecif-dropdown"
                    placeholder="Select request type"
                    options={requestTypeOptions}
                    selectedKey={selectedOptionId}
                    onChange={handleRequestTypeChange}
                    styles={{
                      title: { 
                        padding: '0 0 0 5px'
                      }
                    }}
                  />
                  {(selectedOptionId === 3 || selectedOptionId === 4) && (
                    <TextField
                      className="ecif-textbox"
                      placeholder="Search"
                      value={searchValue}
                      onChange={handleSearchChange}
                    />
                  )}
                  <PrimaryButton className="ecif-button" text="Submit" onClick={handleSubmit} />
                </Stack>              

              {/* Render the table */}
              { isLoading ? (
                  <div className="ecif-container">
                    {renderShimmer()}
                  </div>
                ) : (
                  <div>
                    {showDetailsList && responseData.length > 0 ? (
                      <div className="ecif-container">
                        <table style={{ overflowX: 'auto', width: '550px', marginTop: '10px' }}>
                          <thead className="ecif-table-header">
                            <tr>
                              {generateColumns().map(column => (
                                <th key={column.key} className="ecif-table-column"><span style={{fontSize: '12px', fontWeight:'600', lineHeight: '16px'}}>{column.name.charAt(0).toUpperCase()+column.name.slice(1)}</span></th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {responseData.map((item, index) => (
                              <tr key={item.id} className="ecif-table-row">
                                {Object.keys(item).map(key => (
                                  <td key={key} className="ecif-table-row">{item[key]}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : responseData.length === 0 && showDetailsList? (
                      <div className="ecif-container">
                        <MessageBar messageBarType={MessageBarType.info}>No data found</MessageBar>
                      </div>                
                    ) : null}
                  </div>
                )
              }  
              </div>            
            </PivotItem>}
          </Pivot>: (
              <Text>{Constants.NO_DATA_AVAILABLE}</Text>
            )
          }
        </>
      )}
    </Stack>
  );
};

export default InfoPanelTable;
