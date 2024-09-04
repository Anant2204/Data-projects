import { Checkbox, DefaultButton, Dialog, DialogFooter, DialogType, Link, PrimaryButton, Toggle, classNamesFunction } from "@fluentui/react"
import { RouteComponentProps, withRouter } from "react-router";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { messages } from "./Announcements.messages";
import { getStyles } from "./Announcements.styles";
import { useSelector } from "react-redux";
import { getCurrentTheme } from "../../../core/store";
import NoDataImage from "../../images/noDataImage.svg";
import { useEffect, useState } from "react";
import { appConfig } from "../../App.config";

interface OwnProps extends InjectedIntlProps {
  filteredAnnouncements: any;
  hideDialog: boolean;
  toggleHideDialog: (dontShowAgain: boolean) => void;
  openedThroughMenu: boolean;
  title: string;
  subText: string;
}
type Props = OwnProps & RouteComponentProps


const getClassNames = classNamesFunction<any, any>();
let classes: any;

const WhatsNewComponent : React.FC<Props> = ({intl, filteredAnnouncements, hideDialog, toggleHideDialog, openedThroughMenu, title, subText}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const theme = useSelector(getCurrentTheme);
    classes = getClassNames(getStyles, theme);

    const dialogContentProps = {
        type: DialogType.close,
        title,
        closeButtonAriaLabel: intl.formatMessage(messages.closeIconAriaLevel),
        subText
      };

    const [imageError, setImageError] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const handleImageError = () => {
      setImageError(true);
    };
    useEffect(() => {
      if (filteredAnnouncements) {
        const tempUrl = appConfig.isLocalAnnouncement
          ? `/data/announcement/images/${filteredAnnouncements[currentIndex]?.imageName}`
          : `${process.env.REACT_APP_ANNOUNCEMENT_CDN_IMAGE_FOLDER_URL}${filteredAnnouncements[currentIndex]?.imageName}?${process.env.REACT_APP_CDN_TOKEN}`;
        setImageUrl(tempUrl);
      }
    }, [currentIndex, filteredAnnouncements]);
    
    const handlePrevClick = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    };

    const handleNextClick = () => {
      if (currentIndex < filteredAnnouncements.length -1 ) {
        setCurrentIndex(currentIndex + 1);
      }
    };

    const [dontShowAgain, setDontShowAgain] = useState(false);
    const handleDontShowAgainClicked = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) => {
      setDontShowAgain(isChecked);
    }

  function toggleHide(event: any): void {
    toggleHideDialog(dontShowAgain);
  }

    return (
      <Dialog
        minWidth="70vh"
        maxWidth="100vh"
        hidden={hideDialog}
        onDismiss={toggleHide}
        dialogContentProps={dialogContentProps}
      >
        {!!filteredAnnouncements.length ? (
          <div>
            {filteredAnnouncements[currentIndex].announcementDescription.map(
              (item, index) => (
                <>
                  {!imageError &&
                    filteredAnnouncements[currentIndex].imageName && (
                      <img
                        src={imageUrl}
                        className={classes.imageContainer}
                        alt={`${filteredAnnouncements[currentIndex].announcementTitle}`}
                        onError={handleImageError}
                      />
                    )}
                  <div className={classes.subHeadingContainer} key={index}>
                    <h1 className={classes.subheading}>{item.subheading}</h1>
                    <p className={classes.description}>{item.description}</p>
                    {item.bulletPoints.length != 0 && (
                      <ul className={classes.bulletPoints}>
                        {item.bulletPoints.map((bullet, bulletIndex) => (
                          <li key={bulletIndex}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                    {item.wikiLink && (
                      <Link href={item.wikiLink} target="_blank">
                        {intl.formatMessage(messages.wikiLink)}
                      </Link>
                    )}
                  </div>
                </>
              )
            )}
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <img
              src={NoDataImage}
              alt={intl.formatMessage(messages.noNewAnnouncements)}
            />
            <p className={classes.noDataText}>
              {intl.formatMessage(messages.noNewAnnouncements)}
            </p>
          </div>
        )}
        {!!filteredAnnouncements.length && (
          <>
            <hr />
            <div className={classes.footer}>
              <div className={classes.footterFarLeft}>
                {!openedThroughMenu && (
                  <Checkbox
                    label={intl.formatMessage(messages.dontShowAgain)}
                    onChange={handleDontShowAgainClicked}
                  />
                )}
              </div>
              <div className={classes.footerFarRight}>
                <DefaultButton
                  text={intl.formatMessage(messages.previous)}
                  onClick={handlePrevClick}
                  disabled={currentIndex === 0}
                  className={classes.footerButton}
                />
                <PrimaryButton
                  text={intl.formatMessage(messages.next)}
                  onClick={handleNextClick}
                  disabled={currentIndex === filteredAnnouncements.length - 1}
                  className={classes.footerButton}
                />
                <DefaultButton
                  onClick={toggleHide}
                  text={intl.formatMessage(messages.close)}
                  className={classes.footerButton}
                />
              </div>
            </div>
          </>
        )}
      </Dialog>
    );
}

export const WhatsNew = withRouter(injectIntl(WhatsNewComponent));