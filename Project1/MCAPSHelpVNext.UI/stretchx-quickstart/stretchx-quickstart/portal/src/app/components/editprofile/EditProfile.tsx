import React, { useContext, useState, useEffect } from "react";
import { getConsumptionAPI, postConsumptionAPI, putConsumptionAPI } from "../../utils/httpUtils";
import { ServiceContext } from "@msx/platform-services";
import { injectIntl } from "react-intl";
import { FontSizes, MessageBar, MessageBarType, Shimmer, ShimmerElementType } from "@fluentui/react";
import { InjectedIntlProps } from "react-intl";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { messages } from "./EditProfile.messages";
import { PrimaryButton, DefaultButton, Dropdown, Stack } from "@fluentui/react";
import PopUpModal from "../main/Services/PopUpPanel";
import './EditProfile.css';

import * as Constants from '../../utils/constants';
interface OwnProps extends InjectedIntlProps {
  isEditableProfile: boolean;
  currentUserData: any;
  getUserIDByEmailId: any;
  onDismissOpenedPanel:any;
  }

type Props = OwnProps & RouteComponentProps;
const ProfileComponent: React.FC<Props> = (props) => 
{

  const [ispopUpOpen, setPopUpIsOpen] = React.useState(false);
  const [area, setArea] = React.useState();
  const [role, setRole] = React.useState();
  const [segment, setSegment] = React.useState();
  const [subSegment, setSubSegment] = React.useState();
  const [areaOptions, setAreaOptions] = React.useState([]);
  const [roleOptions, setRoleOptions] = React.useState([]);
  const [segmentOptions, setSegmentOptions] = React.useState([]);
  const [subSegmentOptions, setSubSegmentOptions] = React.useState([]);
  const context = React.useContext(ServiceContext);
  const [isLoading, setIsLoading] = useState(true);
  const [dataUpdated, setDataUpdated] = useState(0);
  const [resultError, setResultError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [subSegmentValue, setSubSegmentValue] = React.useState('');
  const [showModal, setShowModal] = useState(true);	
  const [isOpen, setIsOpen] = useState(true);
  const[IsSaveButtonDisable,setSaveButtonDisable] = useState(true);

  useEffect(() => {
    let endPointUrl = "/api/area/getall";
    getDropdownBindArea(endPointUrl);
    getDropdownBindRole("/api/role/getall");
    //getDropdownBindSegment("/api/segment/getall");    

    if (props.currentUserData !== undefined) {
      setArea(props.currentUserData.userArea);
      setRole(props.currentUserData.userRole);
      getDropdownBindSegment(props.currentUserData.userRole);
      subSegmentHandleBind(props.currentUserData.segment);
    }
  }, [props.currentUserData]);

  useEffect(() => {

    if(!area || !role || !segment || !subSegment){
      setSaveButtonDisable(true);
    }
  else{
    if(subSegmentOptions.length===0){
      setSaveButtonDisable(false);
    }
    else{
      if(!area || !role || !segment || !subSegment){
        setSaveButtonDisable(true);
      }
      else{
        setSaveButtonDisable(false);
      }
    }
  }
    
    }
  , [area, role, segment, subSegment, subSegmentOptions.length]);
  
  const getDropdownBindArea = async (endPointUrl) => {
    try {
      if (context? context.telemetryClient :"") {
        setIsLoading(true);

        const responseServiceWorkspace = await getConsumptionAPI(
          endPointUrl,
          context.authClient
        );
        if (responseServiceWorkspace.data) {
          let result = checkResponse(responseServiceWorkspace);
          if (result === "success") {
            if (areaOptions.length === 0) {
              setAreaOptions(
                responseServiceWorkspace.data.map((item) => ({
                  key: item.id,
                  text: item.name,
                }))
              );
            }
            setResultError("success");
          } else {
            setResultError("error");
          }
        }
      }
    } catch (error) {
      console.error("An error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  const getDropdownBindRole = async (endPointUrl) => {
    try {
      if (context ? context.telemetryClient : "") {
        setIsLoading(true);

        const responseServiceWorkspace = await getConsumptionAPI(
          endPointUrl,
          context.authClient
        );
        if (responseServiceWorkspace.data) {
          let result = checkResponse(responseServiceWorkspace);
          if (result === "success") {
            if (roleOptions.length === 0) {
              setRoleOptions(
                responseServiceWorkspace.data.map((item) => ({
                  key: item.id,
                  text: item.name,
                }))
              );
            }
            setResultError("success");
          } else {
            setResultError("error");
          }
        }
      }
    } catch (error) {
      console.error("An error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  const getDropdownBindSegment = async (role) => {
    try {
      if (context ? context.telemetryClient : "") {
        setIsLoading(true);
        let responseServiceWorkspace = await getConsumptionAPI (
          `/api/Segment/GetAllSegmentByRole/${role}`,
          context.authClient
        );        
        if (responseServiceWorkspace.data) {
          let result = checkResponse(responseServiceWorkspace);
          if (result === "success") {
            getDropDownBindSuccess(responseServiceWorkspace);
          } 
          else{
            setResultError("error");
          }
        }
      }
    } catch (error) {
      console.error("An error occurred while fetching data.", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDropDownBindSuccess = (responseServiceWorkspace: any) => {
    if(responseServiceWorkspace.data.length > 0){
      setSegmentOptions(
      responseServiceWorkspace.data.map((item) => ({
        key: item.id,
        text: item.name,
      })));
      const filteredDataresult = responseServiceWorkspace.data.some(item => item.id === props.currentUserData.segment) ? 1 : 0;
      if(filteredDataresult === 1) {
        setSegment(props.currentUserData.segment);
      }
      else{
        setSegment(null);
      }
    }
    else{
      setSegmentOptions([])
      setSegment(null);
    }
    setResultError("success");
  }
  
  let updateUser = async (e) => { 
    debugger 
    try {
      const apiUrl = '/api/User/Update';
      const putData = {
        Id: props.currentUserData.id,
        UPN: props.currentUserData.upn,
        UserArea: area ? area : props.currentUserData.userArea,
        UserRole: role ? role : props.currentUserData.userRole,
        UserADGroupID: [
          {
            userADGroupID: 1
          }
        ],
        Segment: segment ? segment : props.currentUserData.segment,
        SubSegment: subSegment ,
        DataverseRowID: props.currentUserData.dataverseRowID,
        IsActive: props.currentUserData.isActive,
        IsWelcomeMessage: null
      };

      const response = await putConsumptionAPI(apiUrl, putData, context.authClient);     
      if (response.status >= 200 && response.status < 300) {
            props.onDismissOpenedPanel(e);
            setSuccessMessage();
            props.getUserIDByEmailId();
      }
    } catch (error) {
      console.error('An error occurred while fetching api.', error);
    }
  }

  const setSuccessMessage = ()=>
  {
    const messagediv = document.getElementById("actmessages");
    const messagetext = document.getElementsByClassName("message-text");
    messagetext[0].innerHTML  = Constants.USER_UPDATE_DIALOG_CONTENT.subText;
    messagediv.style.display = "block";
    const timeoutId = setTimeout(() => {
      messagediv.style.display = "none";
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }
 

  const checkResponse = (response) => {
    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return "success";
      case 401:
      default:
        return "error";
    }
  };


  const handleAreaChange = (event, option) => {
    setArea(option.key);
  };

  const handleRoleChange = (event, option) => {
    setRole(option.key);
    getDropdownBindSegment(option.key);
    setSubSegment(null);
  };

  const handleSegmentChange = async (event, option) => {

    setSegment(option.key);
    subSegmentHandleBind(option.key);

    setSubSegment(null);
 
  };  
  const handleDropDownClick = (event) => {
    event.stopPropagation();
    setTimeout(()=>{
      let ele =  document.querySelector('.ms-Dropdown-callout');
 
      if(ele !== null){
        let p = ele.parentNode.parentNode.parentNode as HTMLElement;
        p.style.zIndex = '200000000';
      
      }
    },100)

    
  }
  const handleSubSegmentChange = (event, option) => {
    setSubSegment(option.key);
  };
  
  

  const subSegmentHandleBind = async (segmentID) => {
    try {
      if (context ? context.telemetryClient : "") {
        setIsLoading(true);

        let responseServiceWorkspace = await getConsumptionAPI(
          `/api/SubSegment/GetAllSubSegmentBySegmentId/${segmentID}`,
          context.authClient
        );
        if (responseServiceWorkspace.data) {
          let result = checkResponse(responseServiceWorkspace);
          if (result === "success") {
           
            if(responseServiceWorkspace.data.length>0){
              resposneHandler(responseServiceWorkspace);
           }
            else{
              setSubSegmentOptions([])
              setSubSegment(null);
            }
            setResultError("success"); 
          } else {
            setResultError("error");
          }
        }
       
      }
    } catch (error) {
      console.error("An error occurred while fetching data.", error);
    } finally {
      setIsLoading(false);
    }
  }

  const resposneHandler = (responseServiceWorkspace: any) => {
    setSubSegmentOptions(
      responseServiceWorkspace.data.map((item) => ({
        key: item.id,
        text: item.name,
      }))
    );

  let filteredDataresult = responseServiceWorkspace.data.some(item => item.id === props.currentUserData.subSegment) ? 1 : 0;
        if (responseServiceWorkspace.data.length === 1)
        {              
          let d = responseServiceWorkspace.data.filter(item => item.name === "N/A")[0]['id']
          setSubSegment(d);
        }           
        else if(filteredDataresult === 1) {
        setSubSegment(props.currentUserData.subSegment);
        }
        else{
          setSubSegment(null);
        }  
  
    return { subSegmentOptions, subSegment, resultError };
  };
  

const attachButtonClick = ()=>{
  let elementsWithClass =document.querySelector("button[aria-label='Profile'][value='Profile']")
  elementsWithClass.classList.remove('is-checked');
}

  const handleSave = (e) => {
    if (!area && !role && !segment  && !subSegment) {

    }
     else {
      updateUser(e);
      props.onDismissOpenedPanel(e);
      attachButtonClick()  
    }    
  };

  const handleCancel = (e) => {
    setArea(null);
    setRole(null);
    setSegment(null);
    setSubSegment(null);
    props.onDismissOpenedPanel(e);
    attachButtonClick();
  };

  const renderMain = (): JSX.Element => {
    return (
      <div>
        {isLoading && (
          <div style={{ minHeight: '350px' }}>
            <p>Loading...</p>
          </div>
        )}
        {!isLoading && (
          <Stack
            horizontalAlign="center"
            verticalAlign="center"
            tokens={{ childrenGap: 20 }}
            className="editProfile"
          >


            <form style={{
              minHeight: '275px',
              fontFamily: 'Segoe UI', fontSize: '14px', fontWeight: '200', lineHeight: '36px', letterSpacing: '0px', textAlign: 'left'
            }
            }>
              <div style={{
                width: '112px',
                height: '22px',
                top: '203px',
                left: '1616px',
                //styleName: Size16 Semibold;
                fontFamily: 'Segoe UI',
                fontSize: '16px',
                fontWeight: '600',
                lineHeight: '22px',
                letterSpacing: '0em',
                textAlign: 'left',
                //marginLeft: '-6px'
              }}>
                My Preferences
              </div>
              <Stack tokens={{ childrenGap: 16 }}>
                <Dropdown
                  label="Area"
                  selectedKey={area}
                  onChange={handleAreaChange}
                  onClick={handleDropDownClick}
                  options={areaOptions}
                  required
                  className="area"
                  placeholder="Please select an Area"
                  styles={{
                    dropdown:{
                       zIndex: '2000000000 !important'
                    },
                    root: {
                      width: 289, height: 62,
                      fontFamily: 'Segoe UI',
                      fontSize: '14px',
                      fontWeight: '600',
                      lineHeight: '20px',
                      letterSpacing: '0px',
                      textAlign: 'left',
                      //marginLeft: '-6px'
                    }
                  }}
                />
                <Dropdown
                  label="Role"
                  selectedKey={role}
                  onChange={handleRoleChange}
                  onClick={handleDropDownClick}
                  options={roleOptions}
                  required
                  placeholder="Please select a Role"
                  styles={{
                    root: {
                      width: 289, height: 62,
                      fontFamily: 'Segoe UI',
                      fontSize: '14px',
                      fontWeight: '600',
                      lineHeight: '20px',
                      letterSpacing: '0px',
                      textAlign: 'left',
                      //marginLeft: '-6px'
                    }
                  }}
                />
                <Dropdown
                  label="Segment"
                  selectedKey={segment}
                  onChange={handleSegmentChange}
                  onClick={handleDropDownClick}
                  options={segmentOptions}
                  required
                  placeholder="Please select a Segment"
                  styles={{
                    root: {
                      width: 289, height: 62,
                      fontFamily: 'Segoe UI',
                      fontSize: '14px',
                      fontWeight: '600',
                      lineHeight: '20px',
                      letterSpacing: '0px',
                      textAlign: 'left',
                      //marginLeft: '-6px'
                    }
                  }}
                />
                {subSegmentOptions.length > 0 && (
                  //<div className="popup-field">
                  <Dropdown
                    label="Subsegment"
                    selectedKey={subSegment}
                    onChange={handleSubSegmentChange}
                    options={subSegmentOptions}
                    onClick={handleDropDownClick}
                    //name="dropdown"
                    required
                    //{...register("dropdown", { required: true })}
                    errorMessage={!subSegmentOptions ? 'Please select a subsegment' : undefined}
                    //required={true}
                    placeholder="Please select a Subsegment"
                    styles={{
                      root: {
                        width: 289, height: 62,
                        //width: '80px',
                        //height: '20px',
                        //styleName: SegoeUI Semibold / 14 - ms-fontSize-14 FontSizes.size14;
                        fontFamily: 'Segoe UI',
                        fontSize: '14px',
                        fontWeight: '600',
                        lineHeight: '20px',
                        letterSpacing: '0px',
                        textAlign: 'left',
                        //marginLeft: '-6px'

                      }
                    }}
                  />
                  //</div>
                )}
             <MessageBar
            messageBarType={MessageBarType.info}
            isMultiline={true}
            styles={{ root: { marginTop: '10px' } }}
          >
              The Services already added in My Help Workspace will be affected and reset when you change the preferences.     
          </MessageBar>
              <div className="profilebutton" style={{float:'left'}}>
                  <Stack
                    horizontal
                    horizontalAlign="end"
                    tokens={{ childrenGap: 10 }}
                    style={{float:'left'}}
                  >
                    {isLoading ? (
                      <DefaultButton
                        className="popup-save"
                        text="Save"
                        disabled
                      />
                    ) : (<PrimaryButton
                      className="popup-save-edit"
                      text="Save"
                      disabled={IsSaveButtonDisable}
                      onClick={(e)=>handleSave(e)}
                      styles={{ root: { fontFamily: 'Segoe UI', marginTop: '16px' } }}
                    />
                    )}

                    {isLoading ? (
                      <DefaultButton
                        className="popup-reset"
                        text="Cancel"
                        disabled
                      />
                    ) : (
                      <DefaultButton
                        className="popup-reset"
                        text="Cancel"
                        styles={{ root: { fontFamily: 'Segoe UI', paddingLeft:'10px', marginTop: '16px' } }}
                        onClick={(e)=>handleCancel(e)}
                        //onClick={closeModal}
                      />
                    )}

                  </Stack>            
                  </div>

                {/* {successMessage && (
                  <div style={{ color: 'green', marginTop: '10px' }}>
                    {successMessage}
                  </div>
                )} */}
              </Stack>
            </form>
          </Stack>
        )}

      </div>
    );
  };


  return renderMain();
};


export const EditProfile = withRouter(injectIntl(ProfileComponent));


