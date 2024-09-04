import React from "react";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import { Dropdown, PrimaryButton } from "@fluentui/react";
import { DefaultButton } from "@fluentui/react";
import { ServiceContext } from "@msx/platform-services";
import { SETChileComponentName, SETHasServiceRequestTypeLogData, SETIsCustomeLog, SETLogEventData, SETServiceRequestTypeLogData } from "../../../../core/store";
import { useDispatch } from "react-redux";
const PopUpModal = ({
  
  isVisible = false,
  onConfirm = (e) => {},
  onCancel = () => {},
  onHide,
  itemId = "",
  dialogTitle = "",
  dialogSubText = "",
  buttonsCount = 0,
  buttonTextOne = "",
  buttonTextTwo = "",
  options = [],
  modalValue = "",
  openWebForm = (e) => {},
  openModal = (e) => {}
}) => {
 
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [value, setValue] = React.useState(modalValue);
  const reduxDispatch = useDispatch();

  const handleChange = (event, option) => {
   
    setSelectedOption(option);
    setValue(option.value);
    isVisible = false;
  };
  const onGetStarted = async () => {
    
    // Parse the URL
    const urlParams = new URLSearchParams(value);

    // Check if the URL contains the requestType parameter
    if (urlParams.has("requestType")) {
      // Get the value of the requestType parameter
      const requestType = urlParams.get("requestType");

      const formattedRequestType = requestType.replace(/\s/g, "").toLowerCase();
      const formattedSelectedOption = selectedOption.text
        .replace(/\s/g, "")
        .toLowerCase();
      console.log(requestType);
      // Check if the requestType meets your criteria
      if (selectedOption && formattedRequestType === formattedSelectedOption) {
        // Open the webform or perform any action
        setSelectedOption(null);
        openWebForm(formattedRequestType);
        onCancel();
      }
    } else {
      setSelectedOption(null);
      openModal(value);
      onCancel();
    }
     // Start Event Logging //
   await reduxDispatch(SETChileComponentName('Dialog '+ dialogTitle));
   
   await reduxDispatch(SETHasServiceRequestTypeLogData(true));
   await reduxDispatch(SETLogEventData(
    {
      elementName:"Request Type dropdown Start",
      elementId:"",
      action:"click",
      message : `User click on Request Type dropdown Start`,
    }
   ));
   await reduxDispatch(SETServiceRequestTypeLogData(
    {ServiceName: dialogTitle,
    RequestType: selectedOption.text ||"",
    TileName:'',
    IsNonIrisService:'true',
    IrisUtterance:''
    }
    ));
    await reduxDispatch(SETIsCustomeLog(true));
  // End Event Logging //    
  };

  const onClose = () => {
    setSelectedOption(null);
    onCancel();
  };

  const FooterContent = () => {
    switch (buttonsCount) {
      case 0:
        return (
          <>
            <Dropdown
              placeholder="Select an option"
              options={options}
              selectedKey={selectedOption ? selectedOption.key : undefined}
              onChange={handleChange}
              className="customDropdown"
              aria-label={dialogTitle + " " + dialogSubText}
              styles={{
                root: {
                  width: 300,
                  marginTop: -20,
                  marginBottom: 10,
                },
              }}
            />
            {selectedOption ? (
              <>
                <PrimaryButton
                  aria-label={buttonTextOne}
                  onClick={onGetStarted}
                  text={buttonTextOne}
                  styles={{ root: { marginRight: 10 } }}
                />
                <DefaultButton
                  onClick={onClose}
                  aria-label={buttonTextTwo}
                  text={buttonTextTwo}
                />
              </>
            ) : (
              <>
                <PrimaryButton
                  onClick={onGetStarted}
                  aria-label={buttonTextOne}
                  disabled={true}
                  text={buttonTextOne}
                  styles={{ root: { marginRight: 10 } }}
                />
                <PrimaryButton
                  onClick={onClose}
                  aria-label={buttonTextTwo}
                  text={buttonTextTwo}
                />
              </>
            )}
          </>
        );
      case 1:
        return (
          <DefaultButton
            aria-label={buttonTextTwo}
            onClick={onCancel}
            text={buttonTextTwo}
          />
        );
      case 2:
        return (
          <>
            <PrimaryButton
              onClick={() => onConfirm(itemId)}
              aria-label={buttonTextOne}
              text={buttonTextOne}
              styles={{ root: { marginRight: 10 } }}
            />
            <DefaultButton
              onClick={onCancel}
              aria-label={buttonTextTwo}
              text={buttonTextTwo}
            />
          </>
        );
      default:
        return null;
    }
  };
  

  return (
    <Dialog
      hidden={!isVisible}
      onDismiss={() => {
        onHide();
        setSelectedOption(null);
      }}
      dialogContentProps={{
        type: DialogType.normal,
        title: dialogTitle,
        subText: dialogSubText,
      }}
      modalProps={{
        isBlocking: false,
        styles: { main: { maxWidth: 450, maxHeight: "auto" } },
        // isDarkOverlay:false
      }}
      styles={(props) => ({ main: { boxShadow: "none" } })} // other props
      className="service-tile-model">
      <DialogFooter>
      <FooterContent />
      </DialogFooter>
    </Dialog>
  );
};

export default PopUpModal;
