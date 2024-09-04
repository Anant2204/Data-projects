import React, { useEffect, useState } from 'react';
import { Modal, PrimaryButton, Dropdown, TextField, IDropdownOption, Stack, IconButton } from '@fluentui/react';
import { getConsumptionAPI } from '../../../app/utils/httpUtils';
import { ServiceContext } from '@msx/platform-services';


const SegmentPopup = ({ currentUserDbId, isOpen, handleClose, handleOpen, setRoles = (a, b, c, d) => { } }) => {
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
  const [resultError, setResultError] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  // const [currentUserDbId, setCurentUserDbId] = useState(0);
  const [currentUserData, setCurrentUserData] = useState([]);
  const [IsSaveButtonDisable, setSaveButtonDisable] = useState(true);

  useEffect(() => {

    ///if (currentUserDbId === -1) {
      let fetchData = async () => {
        getDropdownBindArea('/api/area/getall');
        getDropdownBindRole('/api/role/getall');
        //getDropdownBindSegment('/api/segment/getall');
      };
      fetchData();
   // }
  }, []);//[currentUserDbId]

  useEffect(() => {
    if (!area || !role || !segment) {
      setSaveButtonDisable(true);
    }
    else {
      if (subSegmentOptions.length === 0) {
        setSaveButtonDisable(false);
      }
      else {
        if (!area || !role || !segment || !subSegment) {
          setSaveButtonDisable(true);
        }
        else {
          setSaveButtonDisable(false);
        }
      }
    }

  }
    , [area, role, segment, subSegment, subSegmentOptions.length]);

  const closeModal = (e) => {
    e.preventdefault();
    setShowModal(false);
  }

  const getDropdownBindArea = async (endPointUrl) => {
    try {
      if (context && context.telemetryClient) {
        setIsLoading(true);

        const responseServiceWorkspace = await getConsumptionAPI(
          endPointUrl,
          context.authClient
        );
        if (responseServiceWorkspace.data) {
          let result = checkResponse(responseServiceWorkspace);
          if (result === "success") {
            setAreaOptions(responseServiceWorkspace.data.map(item => ({ key: item.id, text: item.name })));
            setResultError("success");
            const jsonDataWorkspace = responseServiceWorkspace.data;

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
      if (context && context.telemetryClient) {
        setIsLoading(true);

        const responseServiceWorkspace = await getConsumptionAPI(
          endPointUrl,
          context.authClient
        );
        if (responseServiceWorkspace.data) {
          let result = checkResponse(responseServiceWorkspace);
          if (result === "success") {
            setRoleOptions(responseServiceWorkspace.data.map(item => ({ key: item.id, text: item.name })));

            setResultError("success");
            const jsonDataWorkspace = responseServiceWorkspace.data;

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
      if (context && context.telemetryClient) {
        setIsLoading(true);        
        let responseServiceWorkspace = await getConsumptionAPI(
          `/api/Segment/GetAllSegmentByRole/${role}`,
          context.authClient
        );
        if (responseServiceWorkspace.data) {

          let result = checkResponse(responseServiceWorkspace);
          if (result === "success") {
            setSegmentOptions(responseServiceWorkspace.data.map(item => ({ key: item.id, text: item.name })));

            setResultError("success");
            //const jsonDataWorkspace = responseServiceWorkspace.data;

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

  // const getDropdownBindSubSegment = async (endPointUrl) => {
  //   try {
  //     if (context && context.telemetryClient) {
  //       setIsLoading(true);

  //       const responseServiceWorkspace = await getConsumptionAPI(
  //           endPointUrl,
  //         context.authClient
  //       );
  //       if (responseServiceWorkspace.data) {
  //           
  //         let result = checkResponse(responseServiceWorkspace);
  //         if (result === "success") {
  //           setSubSegmentOptions(responseServiceWorkspace.data.map(item => ({ key: item.id, text: item.name })));              


  //           setResultError("success");
  //           const jsonDataWorkspace = responseServiceWorkspace.data;

  //         } else {
  //           setResultError("error");

  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error("An error occurred while fetching data.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


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

  const handleRoleChange = async (event, option) => {
    setRole(option.key);
    await getDropdownBindSegment(option.key);    
  };

  const handleSegmentChange = async (event, option) => {
    setSegment(option.key);

    try {
      if (context && context.telemetryClient) {
        setIsLoading(true);

        let responseServiceWorkspace = await getConsumptionAPI(
          `/api/SubSegment/GetAllSubSegmentBySegmentId/${option.key}`,
          context.authClient
        );
        if (responseServiceWorkspace.data) {
          let result = checkResponse(responseServiceWorkspace);
          if (result === "success") {
            setSubSegmentOptions(responseServiceWorkspace.data.map(item => ({ key: item.id, text: item.name })));
            if (responseServiceWorkspace.data.length === 1)
            {              
              let d = responseServiceWorkspace.data.filter(item => item.name === "N/A")[0]['id']
              setSubSegment(d);
            }  
            else{
              setSubSegment(null);
            }

            setResultError("success");
            const jsonDataWorkspace = responseServiceWorkspace.data;
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

  const handleSubSegmentChange = (event, option) => {
    setSubSegment(option.key);
  };

  const refreshPage = () => {
    //window.location.reload(false);
    window.location.href = window.location.href;
  }
  const handleSave = () => {
    //debugger
    setRoles(area, role, segment, subSegment)
    handleClose();

  };

  const handleCancel = () => {
    setArea(null);
    setRole(null);
    setSegment(null);
    setSubSegment(null);
    handleClose();
  };

  
  return (
    <div>
      <Modal
        isOpen={isOpen}
        isBlocking={true}
        onDismiss={handleClose}
        titleAriaId="popup-title-profile"
      >
        <div className="popup-profile" style={{
          width: 406, borderRadius: 4, border: '0px solid #D1D1D1',height: 'auto', maxHeight: 515, 
          background: 'linear-gradient(0deg, #FFFFFF, #FFFFFF)'
        }}>
          <div className="popup-header-profile" style={{
            width: 351, backgroundColor: '#FFFFFF', paddingLeft: 18,
            marginTop: 16, fontFamily: 'Segoe UI',
            fontSize: 18, fontWeight: 600, letterSpacing: '0em', textAlign: 'left'
          }}>
            <span id="modal-title-profile">My Preferences</span>
            {/* <IconButton
              iconProps={{ iconName: "Cancel" }}
              ariaLabel="Close modal"
              onClick={handleClose} style={{ marginRight: -40 }} /> */}

            {/* <DefaultButton className="popup-close" iconProps={{ iconName: 'Cancel' }} onClick={handleClose} /> */}
          </div>
          <div className="popup-body-profile" style={{ gap: 16, marginLeft: 22, marginRight: 10, marginTop: 16 //,height: 296
            }}>

            <Stack tokens={{ childrenGap: 16 }} styles={{ root: { flexWrap: 'wrap', justifyContent: 'flex-start' } }}>
              <div className="popup-field-profile" style={{ width: 360, height: 62, gap: 16, padding: '5px, 0px, 5px, 0px' }}>
                <Dropdown
                  label="Area"
                  selectedKey={area}
                  onChange={handleAreaChange}
                  options={areaOptions}
                  required
                  placeholder='Please select an Area'

                  style={{
                    fontFamily: 'Segoe UI',
                    fontSize: 14,
                    fontWeight: 600,
                    lineHeight: 20,
                    letterSpacing: 0,
                    textAlign: 'left',
                    marginLeft: '0 !important'
                  }}

                />
              </div>
              <div className="popup-field-profile" style={{ width: 360, height: 62, gap: 16 }}>
                <Dropdown
                  label="Role"
                  selectedKey={role}
                  onChange={handleRoleChange}
                  options={roleOptions}
                  required
                  placeholder='Please select a Role'
                  style={{
                    fontFamily: 'Segoe UI',
                    fontSize: 14,
                    fontWeight: 600,
                    lineHeight: 20,
                    letterSpacing: 0,
                    textAlign: 'left',
                    marginLeft: '0 !important'
                  }}

                />
              </div>
              <div className="popup-field-profile" style={{ width: 360, height: 62, gap: 16 }}>
                <Dropdown
                  label="Segment"
                  selectedKey={segment}
                  onChange={handleSegmentChange}
                  options={segmentOptions}
                  required
                  placeholder='Please select a Segment'
                  style={{
                    fontFamily: 'Segoe UI',
                    fontSize: 14,
                    fontWeight: 600,
                    lineHeight: 20,
                    letterSpacing: 0,
                    textAlign: 'left',
                    marginLeft: '0 !important'
                  }}
                />
              </div>

              {subSegmentOptions.length > 0 &&
                <div className="popup-field-profile" style={{ width: 360, height: 62, gap: 16 }}>
                  <Dropdown
                    label="Subsegment"
                    selectedKey={subSegment}
                    onChange={handleSubSegmentChange}
                    options={subSegmentOptions}
                    required
                    placeholder='Please select a Subsegment'
                    style={{
                      fontFamily: 'Segoe UI',
                      fontSize: 14,
                      fontWeight: 600,
                      lineHeight: 20,
                      letterSpacing: 0,
                      textAlign: 'left',
                      marginLeft: '0 !important'
                    }}

                  />
                </div>}
            </Stack>

            <Stack
              horizontal
              horizontalAlign="end"
              tokens={{ childrenGap: 20 }}
              styles={{ root: { flexWrap: 'wrap', justifyContent: 'flex-start', float: 'right' } }}
            >
               <div className="popup-footer-text" style={{ gap: 16, marginLeft:12, marginRight:16, marginTop: 20, padding:0, textAlign: 'justify', fontSize:12}}>
          <b>Note: </b>You can update your preferred Area and Role at any time from My Profile (icon in top, right corner){'>'}My Preferences</div>
              <div className="popup-footer-profile" style={{ backgroundColor: '#FFFFFF', padding: 0, marginTop: 10,marginRight:16,marginBottom:25}}>
                <PrimaryButton
                  className="popup-save-edit" style={{
                    width: 54, height: 32, padding: '5 12 5 12', borderRadius: 2, gap: 16,
                    fontFamily: 'Segoe UI',
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: 20,
                    letterSpacing: '0em',
                    textAlign: 'center',
                    color: '#fff',
                    marginRight:0  
                  }}
                  text="Save"
                  onClick={handleSave}
                  disabled={IsSaveButtonDisable}
              />
               

             </div>
            </Stack>

          </div>
         
        </div>

      </Modal>



    </div>
    )     
 
};

export default SegmentPopup;


