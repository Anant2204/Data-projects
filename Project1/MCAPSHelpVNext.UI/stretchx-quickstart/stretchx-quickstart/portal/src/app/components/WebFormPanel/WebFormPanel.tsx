import React from 'react';
import EmployeeAssignmentSupport from './EmployeeAssignmentSupport/EmployeeAssignmentSupport';
import AccountManagementSupport from './AccountManagement/AccountManagemenuSupport';
import AwardsRequest from './AwardsRequest/AwardsRequest';
import PartnerRelatedRequest from './PartnerRelatedRequest/PartnerRelatedRequest';
import RevenueRequests from './RevenueRequests/RevenueRequests';
import QuotaAndIncentiveCompensation from './QuotaAndIncentiveCompensation/QuotaAndIncentiveCompensation';
import FieldBiRequest from './FieldBIRequest/FieldBiRequest';
import RevenueRequestsAdmin from './RevenueRequestAdmin/RevenueRequestAdmin';

const WebFormPanel = ({isPanelOpen,closeWebFormPanel, formDataToIris, showBot, irisContext, chatBotIconClick }) => {
  switch (irisContext.tileName) {
    case 'Employee Assignment Requests':
      return (
        <EmployeeAssignmentSupport
          isPanelOpen={isPanelOpen}
          closeWebFormPanel={closeWebFormPanel}
          setFormDataToIris={formDataToIris}
          setShowBot={showBot}
          webFormIrisContext={irisContext}
          handleChatBotIconClick={chatBotIconClick}
        />
      );
    case 'Account Management Requests':
      return (
        <AccountManagementSupport
          isPanelOpen={isPanelOpen}
          closeWebFormPanel={closeWebFormPanel}
          webFormIrisContext={irisContext}
          setShowBot={showBot}
          setFormDataToIris={formDataToIris}
          handleChatBotIconClick={chatBotIconClick}
        />
      );
    case 'Awards-Contests and Incentive Requests':
      return(
        <AwardsRequest
          isPanelOpen={isPanelOpen}
          closeWebFormPanel={closeWebFormPanel}
          setFormDataToIris={formDataToIris}
          setShowBot={showBot}
          webFormIrisContext={irisContext}
          handleChatBotIconClick={chatBotIconClick}
        />
      );
    case 'Partner Related Requests':
      return(
        <PartnerRelatedRequest
          isPanelOpen={isPanelOpen}
          closeWebFormPanel={closeWebFormPanel}
          partnerWebFormContext={irisContext}
          setShowBot={showBot}
          setFormDataToIris={formDataToIris}
          handleChatBotIconClick={chatBotIconClick}
        />
      );
    case 'Revenue Requests':
      return(
        <RevenueRequests
          isPanelOpen={isPanelOpen}
          closeWebFormPanel={closeWebFormPanel}
          webFormIrisContext={irisContext}
          setShowBot={showBot}
          setFormDataToIris={formDataToIris}
          handleChatBotIconClick={chatBotIconClick}
        />
      );
    case 'Quota and Incentive Compensation Requests':
      return(
        <QuotaAndIncentiveCompensation
          isPanelOpen={isPanelOpen}
          closeWebFormPanel={closeWebFormPanel}
          webFormIrisContext={irisContext}
          setShowBot={showBot}
          setFormDataToIris={formDataToIris}
          handleChatBotIconClick={chatBotIconClick}
        />
      );
    
    case 'Field BI and Enablement Requests':
      return <FieldBiRequest
      isPanelOpen={isPanelOpen}
      closeWebFormPanel={closeWebFormPanel}
      fieldWebFormContext={irisContext}
      setShowBot={showBot}
      setFormDataToIris={formDataToIris}
      handleChatBotIconClick={chatBotIconClick}
    />
    case 'Revenue Requests (Admin)':
      return (
        <RevenueRequestsAdmin
          isPanelOpen={isPanelOpen}
          closeWebFormPanel={closeWebFormPanel}
          webFormIrisContext={irisContext}
          setShowBot={showBot}
          setFormDataToIris={formDataToIris}
          handleChatBotIconClick={chatBotIconClick}
        />
    );
    default:
      return null;
  }
};

export default WebFormPanel;
