import React, { useContext, useEffect, useState } from 'react';
import { Panel, Text, DatePicker, Icon, DocumentCard, IconButton, PanelType, PrimaryButton, DefaultButton, Stack } from '@fluentui/react';
import './AnnouncementBanner.css';
import { InjectedIntlProps, injectIntl } from "react-intl";
import { getConsumptionAPI } from '../../utils/httpUtils';
import { ServiceContext } from '@msx/platform-services';
import { useHistory } from "react-router-dom";
import { MyContextProvider, useMyContext } from "../../context/myContext";
import { any, bool } from 'prop-types';
import ErrorComponent from '../CatalogPage/ErrorComponent';
import announcementIcon from './announcementIcon.png';
import { registerIcons } from '@fluentui/react/lib/Styling';
import { MegaphoneIcon } from '@fluentui/react-icons-mdl2';
import { parse } from 'querystring';


registerIcons({
    icons: {
        MegaphoneIcon: <MegaphoneIcon />,
        outerHeight: '20',
        outerWidth: '20'

    }
});

const announcementProps = {
    userEmail: null,
    isUserLoggedIn: any,
    userId: any,
    title: any,
    description: undefined,
    startDate: '',
    endDate: '',
    isAnnouncement: any,
    currentType: ''


};

const AnnouncementBannerComponent = ({ currentUserData  }) => {
    {     

        const [banner, setBanner] = useState({ ...announcementProps });
        const [readMore, setReadMore] = useState(false);
        const context = React.useContext(ServiceContext);
        const { authClient } = useContext(ServiceContext);
        const [isLoading, setIsLoading] = useState(true);
        const [resultError, setResultError] = useState("");
        const [errorData, setErrorData] = useState([]);
        const [announcementData, setAnnouncementData] = React.useState([]);
        const [isAnnouncement, setIsAnnouncement] = useState("");


        // useEffect(() => {
        //     //debugger
        //     if(currentUserData!== undefined && currentUserData.annoucementKey){
        //    // let boolValue = currentUserData.annoucementKey.toLowerCase() === "true";
                
        //     setIsAnnouncement( ( currentUserData.annoucementKey));
        //         //     console.log("REACT_APP_IS_ANNOUNCEMENT : " + process.env.REACT_APP_IS_ANNOUNCEMENT);
        //         //     console.log("IS_ANNOUNCEMENT : " + process.env.IS_ANNOUNCEMENT);
        //         //    // console.log("All ENv : " + );
        //         //     console.log("All ENv : " + currentUserData);
        //     }
        // }, [currentUserData]);


        useEffect(() => {
            
            const getAnnouncementData = async () => {
                try {
                    if (context && context.telemetryClient) {
                        setIsLoading(true);
                        const responseAnnouncement = await getConsumptionAPI(
                            `/api/Announcement/GetAnnouncements`,
                            context.authClient
                        );
                        if (responseAnnouncement.data) {
                            let result = checkResponse(responseAnnouncement);

                            if (result === "success") {
                                
                                const jsonAnnouncementData = responseAnnouncement.data;
                                setAnnouncementData(jsonAnnouncementData);
                                setResultError("success");
                            } else {
                                setResultError("error");
                                setErrorData(responseAnnouncement.data);
                            }
                        }
                    }
                } catch (error) {
                    console.error("An error occurred while fetching data.");
                } finally {
                    setIsLoading(false);
                }
            };
            //isAnnouncement === "true"
            //debugger
            if (banner.isUserLoggedIn &&  currentUserData!== undefined && currentUserData.annoucementKey === "true" ) {
                getAnnouncementData();
                console.log('isAnnouncement api called');
            }
        }, [banner.isUserLoggedIn && currentUserData!== undefined]);//(isAnnouncement === "true")

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

        let validAnnouncements = announcementData.filter(item => {
            const utcStartDate = new Date(item.startDate).toJSON();
            const utcEndDate = new Date(item.endDate).toJSON();
            const todayDate = new Date().toISOString();
            return todayDate > utcStartDate && todayDate < utcEndDate;
        });
        
        return (
            validAnnouncements.length > 0 ? (
                <div className='banner-wrapper'>
                    {validAnnouncements.map((item) => {
                        const htmlString = '<div>' + item.description + '</div>';
                        const descriptionHTML = { __html: htmlString };
        
                        return (
                            <div className='row' key={item.id}>
                                <div className='column'>
                                    <div className='banner-text'>
                                        <Stack horizontal tokens={{ childrenGap: 10 }}>
                                            <div className='imageDiv' style={{ paddingLeft: 2 }}>
                                                <Icon style={{ width: 10, height: 10 }}
                                                    iconName={
                                                        item.type === 'Critical'
                                                            ? "MegaphoneIcon"
                                                            : item.type === 'Information'
                                                                ? "MegaphoneIcon"
                                                                : item.type === 'Resolved'
                                                                    ? "MegaphoneIcon"
                                                                    : ''} />
                                            </div>
                                            <div className='descDiv' dangerouslySetInnerHTML={descriptionHTML} />
                                        </Stack>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : null
        );
        
        
    };

};
export const AnnouncementBanner = injectIntl(AnnouncementBannerComponent);
