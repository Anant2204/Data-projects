import { Checkbox, DefaultButton, Dialog, DialogFooter, DialogType, Link, PrimaryButton, classNamesFunction } from "@fluentui/react"
import { RouteComponentProps, withRouter } from "react-router";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { messages } from "./Announcements.messages";
import { getStyles } from "./Announcements.styles";
import { useSelector } from "react-redux";
import { getCurrentTheme } from "../../../core/store";
import { useContext, useEffect, useState } from "react";
import { appConfig } from "../../App.config";
import NoDataImage from "./MCAPSHelp_Screen.png"
import { postConsumptionAPI, putConsumptionAPI } from "../../utils/httpUtils";
import React from "react";
import { ServiceContext } from "@msx/platform-services";

interface OwnProps extends InjectedIntlProps {
  filteredAnnouncements: any;
  hideDialog: boolean;
  toggleHideDialog: (dontShowAgain: boolean) => void;
  openedThroughMenu: boolean;
  title: string,
  subText: string,
  currentUserData: any,
  currentUserDbId: number,
  currentUserIsWelcomeMessage: any, 
  handleChildStateChange: any,
  currentUser: any

  // isDialogVisible:any,
  // handleDialogDismiss:any
}
type Props = OwnProps & RouteComponentProps

const getClassNames = classNamesFunction<any, any>();
let classes: any;

const WhatsNewComponent: React.FC<Props> = ({ intl, filteredAnnouncements, hideDialog, toggleHideDialog,
   openedThroughMenu, title, subText, currentUserData, currentUserDbId,
   currentUserIsWelcomeMessage , handleChildStateChange, currentUser }) => {



  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isWelcomeMessageState, setIsWelcomeMessageState] = useState(false);
  const { authClient } = useContext(ServiceContext);
  const context = React.useContext(ServiceContext);
  const [isCheckedMessage, setIsCheckedMessage] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useSelector(getCurrentTheme);
  classes = getClassNames(getStyles, theme);

  const dialogContentProps = {
    type: DialogType.normal,
    title,
    closeButtonAriaLabel: 'Close',
    subText
  };


  const modalProps = {
    isBlocking: true,
    className: classes.modalContainer
  }
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState('');


  useEffect(() => {

    //   const tempUrl = `/data/announcement/${filteredAnnouncements[currentIndex]?.imageName}`;
    const tempUrl = appConfig.isLocalWelcomeExp
      ? `/data/announcement/${filteredAnnouncements[currentIndex]?.imageName}`
      : `${process.env.REACT_APP_WELCOMEEXP_CDN_IMAGE_FOLDER_URL}${filteredAnnouncements[currentIndex]?.imageName}?${process.env.REACT_APP_CDN_TOKEN}`;
    setImageUrl(tempUrl);

  }, [currentIndex, filteredAnnouncements])


  const handleImageError = () => {
    setImageError(true);
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex < filteredAnnouncements.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const [dontShowAgain, setDontShowAgain] = useState(false);
  const handleDontShowAgainClicked = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) => {
    setDontShowAgain(isChecked);

    setIsCheckedMessage(isChecked);
  }

  function toggleHide(event: any): void {

    if (currentUserDbId > 0 && isCheckedMessage) {
      updateUserWelcomeMessage();
    }
    if (currentUserDbId === -1) {
      createUser(currentUser);
    }
    toggleHideDialog(dontShowAgain);

  }



  const createUser = async (currentUser) => {
    try {
     let check = isCheckedMessage!== null ? isCheckedMessage :currentUserIsWelcomeMessage;
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
        IsWelcomeMessage: check,
      };

      const response = await postConsumptionAPI(apiUrl, postData, context.authClient);
      if (response.status >= 200 && response.status < 300) {
       
        console.log('response ', response);
        handleChildStateChange(response.data, check);
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
        Id: currentUserDbId,
        UPN: user.email,
        UserArea: currentUserData.userArea,
        UserRole: currentUserData.userRole,
        UserADGroupID: [
          {
            userADGroupID: 1
          }
        ],
        Segment: currentUserData.segment,
        SubSegment: currentUserData.subSegment,
        DataverseRowID: currentUserData.dataverseRowID,
        IsActive: currentUserData.isActive,
        Oid: currentUserData.oid,
        IsWelcomeMessage: isCheckedMessage!== null ? isCheckedMessage :currentUserIsWelcomeMessage,
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
 
  return (
    <>
      {currentUserDbId === -1 || currentUserIsWelcomeMessage === false ?
        (<Dialog
          minWidth={680}
          maxWidth={680}
          hidden={hideDialog}
          onDismiss={toggleHide}
          dialogContentProps={dialogContentProps}
          modalProps={modalProps}
        >
          {!!filteredAnnouncements.length ? (
            <div>
             <div className="announcementContentContainer"style={{ height: 455}}>
             
                {!imageError && filteredAnnouncements[currentIndex].imageName && (
                  <div className={classes.imageContainerDiv}>
                    <img
                      src={imageUrl}
                      className={classes.imageContainer}
                      alt={`${title}`}
                      onError={handleImageError}
                    />
                  </div>
                )}
                <div>
                  {filteredAnnouncements[currentIndex].announcementDescription.map(
                    (item, index) => (
                      <div className={classes.subHeadingContainer} key={index}>
                        <h5 className={classes.subheading}>{item.subheading}</h5>
                        <p className={classes.description}>{item.description}</p>
                        {!!item.bulletPoints.length && (
                          <ul className={classes.bulletPoints}>
                            {item.bulletPoints.map((bullet, bulletIndex) => (
                              <li key={bulletIndex} dangerouslySetInnerHTML={{ __html: bullet }} />
                            ))}
                          </ul>
                        )}
                         {!!item?.SubbulletPoints?.length && (
                          <ul className={classes.subBulletPoints}>
                            {item.SubbulletPoints.map((bullet, bulletIndex) => (
                              <li key={bulletIndex} dangerouslySetInnerHTML={{ __html: bullet }} />
                            ))}
                          </ul>
                        )}
                        {item.wikiLink && (
                          <Link href={item.wikiLink} target="_blank">
                            {intl.formatMessage(messages.wikiLink)}
                          </Link>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
              <hr />
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <img src={NoDataImage} alt={intl.formatMessage(messages.noNewAnnouncements)} />
            </div>
          )}
          <DialogFooter>
            <hr />
            {!openedThroughMenu && (
              <div style={{ whiteSpace: 'nowrap' }}>
                <Checkbox
                  label={intl.formatMessage(messages.dontShowAgain)}
                  onChange={handleDontShowAgainClicked}
                />
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <DefaultButton
                text={intl.formatMessage(messages.previous)}
                onClick={handlePrevClick}
                disabled={currentIndex === 0}
                style={{ marginRight: '10px' }}
              />
              <PrimaryButton
                text={intl.formatMessage(messages.next)}
                onClick={handleNextClick}
                disabled={currentIndex === filteredAnnouncements.length - 1}
                style={{ marginRight: '10px' }}
              />
              <DefaultButton
                onClick={toggleHide}
                text={intl.formatMessage(messages.close)}
              />
            </div>
          </DialogFooter>
        </Dialog>)
        : (
          <>

          </>
        )}
    </>
  );
}

export const WhatsNew = withRouter(injectIntl(WhatsNewComponent));