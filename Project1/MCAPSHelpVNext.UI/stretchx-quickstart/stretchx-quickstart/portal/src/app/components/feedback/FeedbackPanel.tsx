import React, { useContext, useEffect, useState } from "react";
import {
  Panel,
  PanelType,
  PrimaryButton,
  DefaultButton,
  Spinner,
  CompoundButton,
  Stack,
  Label,
} from "@fluentui/react";
import { ChoiceGroup } from "@fluentui/react/lib/ChoiceGroup";
import { TextField } from "@fluentui/react/lib/TextField";
import { Checkbox } from "@fluentui/react/lib/Checkbox";
import "./FeedbackPanel.css";
import { postConsumptionAPI } from "../../utils/httpUtils";
import { ServiceContext } from "@msx/platform-services";
import * as Constants from "../../utils/constants";
import { bool } from "prop-types";

const initialFeedbackState = {
  satisfaction: "",
  comment: "",
  includeScreenshot: false,
  contactMe: null,
  screenshot: null,
  video: null,
  file: null,
  userEmail: null,
  uploadFiles: false,
  includeRecording: false,
  videoPreview: null,
  imagePreview: null,
  filePreview: null,
  
};

const FeedbackPanel = ({ isOpen, onDismiss, currentUserData }) => {
  const [feedback, setFeedback] = useState({ ...initialFeedbackState });
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showErrorMessageFeedback, setShowErrorMessageFeedback] = useState(false);
  const [showErrorMessageFeedbackEmail, setShowErrorMessageFeedbackEmail] = useState(false);
  
  
  const [showSuccesMessage, setShowSuccessMessage] = useState(false);
  const [choiceGroupKey, setChoiceGroupKey] = useState(Date.now());
  // const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackType, setFeedbackType] = useState(null);
  const [userEmailAddress, setUserEmailAddress] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null); 


  const context = useContext(ServiceContext);

  const handleSatisfactionChange = (ev, option) => {
    const satisfaction = option?.text || "";
    setFeedback((prevFeedback) => ({ ...prevFeedback, satisfaction }));
  };

  const handleContactMeChange = (ev, option) => {    
    const satisfaction = option?.text || "";
    let contactMe =  null;
     if(satisfaction === "Yes")
     {
      contactMe =  true
     }
     else if (satisfaction === "No"){
      contactMe =  false;
      setUserEmailAddress(null);
     }
    
    setSelectedOption(option.key);
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      contactMe,
      userEmail: contactMe ? currentUserData.upn : null,
    }));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSuccess = () => {   
    setSelectedOption(null);
  };

  const setSuccessMessage = ()=>
  {
    const messagediv = document.getElementById("actmessages");
    const messagetext = document.getElementsByClassName("message-text");
    messagetext[0].innerHTML  = Constants.FEEDBACK_ADDED.subText;
    messagediv.style.display = "block";
    const timeoutId = setTimeout(() => {
      messagediv.style.display = "none";
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }

  const validateSubmit = () => {
    if (feedback.comment === null  || feedback.comment === "") {
      setShowSuccessMessage(false);
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 5000);
      return false;
    }
    if ( feedback.contactMe === null) {
      setShowSuccessMessage(false);
      setShowErrorMessageFeedback(true);
      setTimeout(() => {
        setShowErrorMessageFeedback(false);
      }, 5000);
      return false;
    }

    if ( feedback.contactMe !== null && feedback.contactMe && userEmailAddress !== null && !isValidEmail(userEmailAddress)) {
      setShowSuccessMessage(false);
      setShowErrorMessageFeedbackEmail(true);
      setTimeout(() => {
        setShowErrorMessageFeedbackEmail(false);
      }, 5000);
      return false;
    }

    if ( feedback.contactMe !== null && feedback.contactMe && userEmailAddress == null) {
      setShowSuccessMessage(false);
      setShowErrorMessageFeedbackEmail(true);
      setTimeout(() => {
        setShowErrorMessageFeedbackEmail(false);
      }, 5000);
      return false;
    }
    return true;
  }

  const sucessResponseSubmit = () => {
    setShowErrorMessage(false);
    setShowSuccessMessage(true);
    setFeedback({ ...initialFeedbackState });        
    setUserEmailAddress(null); 
    handleSuccess();
    const fileInput = document.getElementById(
      "fileInput"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }

    const fileInputVideo = document.getElementById(
      "fileInputVideo"
    ) as HTMLInputElement;
    if (fileInputVideo) {
      fileInputVideo.value = "";
    }
    const fileInputFile = document.getElementById(
      "fileInputFile"
    ) as HTMLInputElement;
    if (fileInputFile) {
      fileInputFile.value = "";
    }
    setSuccessMessage();
    setFeedbackType(null);   
    setChoiceGroupKey(Date.now());
    document.getElementById("questionContainer")?.focus();
  }

  const handleSubmit = async () => {
    debugger
    if (!validateSubmit()) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const formData = new FormData(); 
    formData.append("UserID", currentUserData.id);
    // formData.append("SatisfactionLevel", feedback.satisfaction);
    formData.append("SatisfactionLevel", "satisfied");
    formData.append("PleaseTellUs", feedback.comment);
    formData.append("Email", userEmailAddress || "");
    formData.append("typeOfFeedback", feedbackType);

    if (feedback.file) {
      formData.append("File", feedback.file);
    }
    if (feedback.video) {
      formData.append("VideoFile", feedback.video);
    }
    if (feedback.screenshot) {
      formData.append("ImageFile", feedback.screenshot);
    }
    const apiUrl = "/api/feedback/Add";
    try {
      const response = await postConsumptionAPI(
        apiUrl,
        formData,
        context.authClient
      );
      if (response.status >= 200 && response.status < 300) {
           sucessResponseSubmit();
      } 
      else {     
        console.error(
          "An error occurred while submitting feedback. Status:",
          response.status
        );
      }
    } catch (error) {
   
      console.error("An error occurred while submitting feedback.", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    setFeedback({ ...initialFeedbackState });
    ///setImagePreview(null);  
    onDismiss();
    handleSuccess();
    setUserEmailAddress(null);
    setIsChecked("header-feedback", false);
    setFeedbackType(null);
  };

  const satisfactionOptions = [
    { key: "verySatisfied", text: "Very Satisfied" },
    { key: "satisfied", text: "Satisfied" },
    { key: "dissatisfied", text: "Dissatisfied" },
    { key: "veryDissatisfied", text: "Very Dissatisfied" },
  ];

  const optionFeedback : any = [
    { key: "Yes", text: "Yes" },
    { key: "No", text: "No" },
    
  ];

  const handleScreenshotChange = (ev, checked, inputID, stateVariable , stateVaiableForPeview, stateFileName) => {
  
    if (!checked) {    
     
      const fileInput = document.getElementById(inputID) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }    
     /// setImagePreview(null);
      setFeedback((prevFeedback) => ({
        ...prevFeedback,
        [stateVaiableForPeview]: false,
        [stateVariable]: false,
        [stateFileName]: null,// screenshot: null,
      
       // screenshot: null,
      }));
    } else {
      // If checked, trigger the hidden file input
      document.getElementById(inputID).click();
    }
  };

  const handleFileChange = ( ev, stateVariable, stateFileName, previewState) => {

    debugger
    const file = ev.target.files[0];  
    if (file) {
      // If a file is selected, update the state and display the image preview
      const reader = new FileReader();
      reader.onloadend = () => {
      
      ///setImagePreview(reader.result);
        
      setFeedback((prevFeedback) => ({
        ...prevFeedback,
        [stateFileName]: file,//screenshot: file,
        [stateVariable]: true,
        [previewState]: reader.result,
        //videoPreview: reader.result,
      }));
      };
      reader.readAsDataURL(file);
    } else {
      // If no file is selected, clear the image preview and update the state
      ///setImagePreview(null);
      setFeedback((prevFeedback) => ({
        ...prevFeedback,
        [stateFileName]: null,// screenshot: null,
        [stateVariable]: false,       
        [previewState]: null
        //includeScreenshot: false,
      }));
    }
  };

  const choiceGroupStyles = {
    flexContainer: { display: 'flex', flexDirection: 'row' },
    root: { marginRight: '16px' }, // Adjust the marginRight value as needed
    choiceField: { marginRight: '8px' }, // Adjust the marginRight value for space between radio buttons
    label: { marginLeft: '8px' },
  };

  const setIsChecked = (item, ischeked) => {
    let headericon = document.getElementById(item);
    if (ischeked == true) {
      headericon.classList.add("is-checked");
    } else {
      headericon.classList.remove("is-checked");
    }
  };  

  const handleInputEmailChange = (event, newValue) => {
    setUserEmailAddress(newValue);
  };

  const feedbackClicked = (e, buttonText) => {   
    setFeedbackType(buttonText);  
  };

  const buttonStyle = {
    marginBottom: '1em', // Adjust the spacing as needed
    fontSize: '16px'
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
      const panel = document.querySelector('#feedbackPanelTest').parentNode.parentNode.parentNode as HTMLElement;
      panel.style.zIndex = '20000000';
      }, 100);
    }
  }, [isOpen]);

  return (
    <Panel
      id="feedbackPanelTest"
      isOpen={isOpen}
      type={PanelType.smallFixedFar}
      onDismiss={handleDismiss}
      headerText="Give us Feedback"
      className="panelHeaderText"
      style={{paddingRight:22}}
    >

<div>
<Stack >
  <h6>Classify your feedback</h6>   
        
        <CompoundButton
        text="Give a Compliment"
        primary
        iconProps={{ iconName: 'HeartFill',  style: { color: 'white', fontSize: '16px', verticalAlign: 'middle' } }}
        onClick={(e) => {
          feedbackClicked(e, 'Give a Compliment');
        }}
        hidden={feedbackType !== null && feedbackType !== 'Give a Compliment'}
        style={buttonStyle}
      >
        Give a Compliment
      </CompoundButton>

      <CompoundButton
        text="Report a Problem"
        primary
        iconProps={{ iconName: 'Assign' ,  style: { color: 'white', fontSize: '16px', verticalAlign: 'middle' } }}
        onClick={(e) => {
          feedbackClicked(e, 'Report a Problem');
        }}
        hidden={feedbackType !== null && feedbackType !== 'Report a Problem'}
        style={buttonStyle}
      >
        Report a Problem
      </CompoundButton>
 
      <CompoundButton
        text="Make a Suggestion"
        primary
        iconProps={{ iconName: 'Lightbulb' ,  style: { color: 'white', fontSize: '16px', verticalAlign: 'middle' } }}
        onClick={(e) => {
          feedbackClicked(e, 'Make a Suggestion');
        }}
        hidden={feedbackType !== null && feedbackType !== 'Make a Suggestion'}
        styles={{ icon: { color: 'white' } }}
        style={buttonStyle}
      >
        Make a Suggestion
      </CompoundButton>      
      </Stack>
      </div>

      { 
      <div className="feedback-content" hidden={feedbackType === null}>
        <div>
          {/* <div
            id="questionContainer"
            className="question-container"
            tabIndex={0}
            aria-labelledby="satisfactionQuestionLabel"
          >
            <h2 id="satisfactionQuestionLabel" className="question">
              Overall, how satisfied are you with MCAPSHelp?{" "}
              <span style={{ color: "red" }} aria-hidden="true">
                *
              </span>
            </h2>
          </div>
          <div className="choice-container">
            <ChoiceGroup
              key={choiceGroupKey}
              options={satisfactionOptions}
              onChange={handleSatisfactionChange}
              className="custom-choice-group"
              required
              aria-labelledby="satisfactionQuestionLabel"
            />
          </div> */}

          <div className="comment-container">
            {
              feedbackType === 'Report a Problem' && (
            <h2 className="question">            
                What went wrong? <span style={{color:'red'}}>*</span>            
            </h2>
           )}
           {
            feedbackType === 'Make a Suggestion' && (
            <h2 className="question">            
                What can we do better? <span style={{color:'red'}}>*</span>            
            </h2>
           )}
          {
            feedbackType === 'Give a Compliment' && (
            <h2 className="question">            
                What did you like? <span style={{color:'red'}}>*</span>            
            </h2>
           )}

            <TextField
              value={feedback.comment}
              onChange={(e, newValue) =>
                setFeedback((prevFeedback) => ({
                  ...prevFeedback,
                  comment: newValue || "",
                }))
              }
              placeholder="Please do not include any confidential or personal information in your comment."
              multiline
              className="custom-textfield"
              aria-labelledby="commentQuestionLabel"
            />

            {showErrorMessage && (
              <p
                className="submit-message"
                style={{ color: "red" }}
                id="errorMessage"
              >
               Please fill in the comment.
              </p>
            )}

          </div>
          <div className="checkbox-options">
            <Checkbox
              label="Include screenshot"
              checked={feedback.includeScreenshot}
              onChange={(ev, checked) => handleScreenshotChange(ev, checked, 'fileInput','includeScreenshot','imagePreview', 'screenshot')}
              aria-labelledby="includeScreenshotLabel"
             
            />
          
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(ev) => handleFileChange(ev, 'includeScreenshot', 'screenshot', 'imagePreview')}
           
            />        

              <Checkbox
              label="Include a screen recording"
              checked={feedback.includeRecording}
              onChange={(ev, checked) => handleScreenshotChange(ev, checked, 'fileInputVideo', 'includeRecording', 'videoPreview', 'video')}
              aria-labelledby="includeScreenshotLabel"
          
              />          
             <input
              type="file"
              accept="video/*" 
              id="fileInputVideo"
              style={{ display: 'none' }}
              onChange={(ev) => handleFileChange(ev, 'includeRecording', 'video' , 'videoPreview')}
              />

              <Checkbox
              label="Upload files"
              checked={feedback.uploadFiles}
              onChange={(ev, checked) => handleScreenshotChange(ev, checked, 'fileInputFile', 'uploadFiles', 'filePreview','file')}
              aria-labelledby="includeScreenshotLabel"
           
              />

              <input
              type="file"
              id="fileInputFile"
              style={{ display: 'none' }}
              onChange={(ev) => handleFileChange(ev, 'uploadFiles', 'file', 'filePreview')}
              />

            <div className="choice-container">
            <h2 className="question">
            May we contact you about your feedback?<span style={{color:'red'}}>*</span>
            </h2>

            
            <ChoiceGroup
              key={'feedback'}  
              selectedKey={selectedOption}      
              options={optionFeedback}
              
              onChange={ handleContactMeChange}
              label=""
              required={true}
              styles={choiceGroupStyles}             
            />

            {showErrorMessageFeedback && (
            <p
              className="submit-message"
              style={{ color: "red" }}
              id="errorMessage"
            >
              Please select, May we contact you about your feedback?
            </p>
          )}         

          <div hidden = {!feedback.contactMe}>
              <TextField autoComplete="no" required={feedback.contactMe}
                placeholder = "Email"  
                value={userEmailAddress}
                onChange={handleInputEmailChange}         
              />
          </div>  
          {showErrorMessageFeedbackEmail && (
            <p
              className="submit-message"
              style={{ color: "red" }}
              id="errorMessage"
            >
              Please fill correct email address.
            </p>
          )}
        
          </div>
   

           { feedback.includeScreenshot && feedback.screenshot && (
            <>
            <h6>Image preview</h6>
                <div className="feedback-preview-image">
                  <img
                    src={feedback.imagePreview}
                    alt="Selected Screenshot"
                    style={{ maxWidth: "100%", maxHeight: "100px" }}
                  />
                </div>
            </>
            )}

            {feedback.includeRecording && feedback.video && (       
              <>
              <h6>Video preview</h6>
              <video controls style={{ maxWidth: '100%', maxHeight: '100px' }}>
              <source
                src={feedback.videoPreview}
                type={feedback.video.type}
              />
              Your browser does not support the video tag.
            </video>
            </>
            )}

            { 
            feedback.uploadFiles && feedback.file && (
              <>
              <h6>File name</h6>
              <div title={feedback.file.name } style={{fontSize:"16px"}} >
              {
                  feedback.file.name 
              }     
              </div>
              </>
            )}         

          </div>
        </div>
        <div className="feedback-end-container">
         <div className="privacy-statement-container">
            <p className="privacy-statement-content">
              By pressing Submit, your feedback will be used to improve
              Microsoft products and services.
              <br />
              <a href={Constants.MICROSOFT_PRIVACY_STATEMENT} target="_blank">
                Privacy Statement
              </a>
            </p>
          </div>

          <div className="feedback-buttons">
            {isLoading ? (
              <div className="loader-container">
                <Spinner label="Submitting..." labelPosition="right" />
              </div>
            ) : (
              <>
                <PrimaryButton
                  text="Submit"
                  onClick={handleSubmit}
                  aria-labelledby="submitButtonLabel"
                />
                <DefaultButton
                  text="Cancel"
                  onClick={handleDismiss}
                  aria-labelledby="cancelButtonLabel"
                />
              </>
            )}
          </div>
        </div>
      </div>
      }
    </Panel>
  );
};

export default FeedbackPanel;
