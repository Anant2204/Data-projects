import React, { useContext, useEffect, useState, useRef } from 'react';
import { Modal, IconButton, Stack, PrimaryButton, Checkbox } from '@fluentui/react';
import { getConsumptionAPI, putConsumptionAPI, postConsumptionAPI } from '../../../app/utils/httpUtils';
import { ServiceContext } from '@msx/platform-services';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import './WelcomeScreen.css';
import apiService from '../../../errorHandling/appService';
import { RouteComponentProps } from 'react-router';
import { any, bool } from 'prop-types';
import WelcomeImg from '../welcomescreen/MCAPSHelp_Screen.png'
import PropTypes from 'prop-types';


interface ICheckboxProps {
   // isCheckedMessage?: boolean;
   // onCheckboxChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    currentUserData: any;
    currentUserIsWelcomeMessage: any;
    //welcomeMessageState:any;
    currentUserDbId: number;
    currentUser: any;
    handleChildStateChange:any;
}

const WelcomeScreenComponent = (props: ICheckboxProps) => {

    const [checked, setChecked] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    //const userId = welcomeProps.userId;
    const { authClient } = useContext(ServiceContext);
    const [showPopup, setShowPopup] = useState(true);
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const [resultError, setResultError] = useState("");
    const context = React.useContext(ServiceContext);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isWelcomeMessageState, setIsWelcomeMessageState] = useState(false);

    const [isChecked, setIsChecked] = useState(false);
    const [currentUserDbId, setCurentUserDbId] = useState(0);
    const [isCheckedMessage, setIsCheckedMessage] = useState(false);

  
  
    
    const date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();

    const checkResponse = (response: { status: any; }) => {
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

    useEffect(() => {
        if (isChecked) {
            if (props.currentUserDbId > 0) {
                setIsWelcomeMessageState(true);
                //updateUserWelcomeMessage();
            }

        } else {
            setIsWelcomeMessageState(false);
        }
    }, [isChecked, props.currentUserDbId]);

    useEffect(() => {
    const scrollElementToTop = () => {
          try {
            let childElement = document.getElementsByClassName('ms-Modal-scrollableContent')[0];
            if (childElement) {
              childElement.scrollTop = 0;
              clearInterval(intervalId);
            }
          } 
          catch (err) {
            //console.error("Error while scrolling element to top:", err);
          }
        };      
        const intervalId = setInterval(scrollElementToTop, 3000);      
        return () => clearInterval(intervalId);
      }, []);

    //Create use called on welcome message OK button
    const createUser = async (currentUser) => {
        try {
           // debugger
            const apiUrl = '/api/User/Add';
            const postData = {
                UPN: currentUser.email,
                Oid: currentUser.userObject.localAccountId,
                UserArea: 0,
                UserRole: 0,
                UserADGroupID: [
                    {
                        userADGroupID: 1,
                    },
                ],
                Segment: 0,
                SubSegment: 0,
                DataverseRowID: "3f5a37dc-8d95-4232-85a7-990dab5888a9",
                IsActive: 1,
                IsWelcomeMessage: isCheckedMessage,
            };

            const response = await postConsumptionAPI(apiUrl, postData, context.authClient);
            if (response.status >= 200 && response.status < 300) {
                //debugger
                console.log('response ', response);               
                props.handleChildStateChange(response.data);
                //window.location.href = window.location.href;
            }
        } catch (error) {
            console.error("An error occurred while fetching api.", error);
        }
    };

    const updateUserWelcomeMessage = async () => {

        const user = await authClient.getUser();
        try {
            const apiUrl = '/api/User/Update';
            const putData =
            {
                Id: props.currentUserDbId,
                UPN: user.email,
                UserArea: props.currentUserData.userArea,
                UserRole: props.currentUserData.userRole,
                UserADGroupID: [
                    {
                        userADGroupID: 1
                    }
                ],
                Segment: props.currentUserData.segment,
                SubSegment: props.currentUserData.subSegment,
                DataverseRowID: props.currentUserData.dataverseRowID,
                IsActive: props.currentUserData.isActive,
                Oid: props.currentUserData.oid,
                IsWelcomeMessage: isCheckedMessage
            };
            // PUT request
            const response = await putConsumptionAPI(apiUrl, putData, context.authClient);

            if (response.status >= 200 && response.status < 300) {

                setSuccessMessage('Welcome message updated successfully !');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 5000);

            }

        } catch (error) {
            console.error('An error occurred while fetching api.', error);
        }
    };
    const handleCheckboxChange = (event) => {
        setIsCheckedMessage(event.target.checked);
      };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    if (!showPopup || dontShowAgain) {
        return null;
    }


    const handleSubmit = () => {
    if (props.currentUserDbId > 0 && isCheckedMessage) {
            updateUserWelcomeMessage();
        }
        if (props.currentUserDbId === -1 ) {

            createUser(props.currentUser);
        }
        setIsOpen(false);      
    };

    const handleClose = () => setIsOpen(false);
    return (
        <>
            {props.currentUserDbId === -1 || props.currentUserIsWelcomeMessage === false ?
                (               
                <Modal
                  topOffsetFixed={true} scrollableContentClassName='scroll-welcome-container' 
                   className='top' isOpen={isOpen} onDismiss={handleClose} isBlocking={true}>                  
                    <div  data-att={isOpen} id='childContaineer' className='welcome-container'>
                      <div className='model-header'>
                        What’s New in MCAPSHelp
                        </div>
                        <div className='model-date'>{monthName} {year}</div>
                        <div className='welcome-container' >
                            <div className='image-section'>
                                <img src={WelcomeImg} width={630} height={230}></img>
                            </div>
                            <div className='welcomePopup'>
                                <div className='model-title'>Welcome to MCAPSHelp: Here you find any Help & Support not yet fully integrated into the tools you use for your role. Let's get started and walk through the basics to get up and running:</div>
                                <br></br>
                                <div className='model-body'>
                                    <ul>
                                        <li className=''>Check your profile (top right of page) is correct and that your Area, Role and Segment are correct - these control the Help & Support topics relevant to you and will configure the catalog</li>
                                        <li className=''>Add topics by selecting the option on the 'My Help Workspace'  - you can also do this from the Catalog page itself.
                                         Search to find help and Support items relevant to you.  Select these and add to your workspace.</li>
                                        <li className=''>In 'My Help Workspace' select the topic (tile) from your added topics to start the co-pilot. Additionally this provide co-pilot with context of the topic you are looking for help on.</li>
                                        <li className=''>Use 'My Help Dashboard' to keep an eye on / check on status of a ticket and to interact with the support agent.</li>
                                        <li className=''>Use the '?' for more help / learning - everything we have briefly covered here is covered in more detail if needed'.</li>
                                    </ul>
                                    OK-you are all set! Go ahead and get yourself setup!
                                    
                                </div>
                                <div className='model-footer'>
                                    <hr style={{ borderTop: '1px solid black', background: '#D2D0CE', width: 672 }} />
                                    <Stack horizontal horizontalAlign="space-between">
                                        <div className='model-paging'>
                                            <div style={{ width: 630 }}>
                                                <Checkbox
                                                    label="Don't show me this message next time I start MCAPSHelp."
                                                    // checked={isChecked}
                                                    // onChange={handleCheckboxChange}
                                                    checked={isCheckedMessage} onChange={handleCheckboxChange}
                                                />
                                            </div>
                                        </div>
                                        <div className='btnOK'>
                                        <PrimaryButton className="welcomeok"
                                            text="Got it"
                                            onClick={handleSubmit}
                                            style={{
                                                width: 60,
                                                height: 32,
                                                padding: '6, 20, 6, 20'                          
                                                ,
                                                marginLeft: 0
                                            }} />
                                        </div>
                                        

                                    </Stack>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
         
                )

                : (
                    <>
                      
                    </>
                )
            }
        </>
    );
};
export const WelcomeScreen = injectIntl(WelcomeScreenComponent);






