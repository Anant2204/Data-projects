import { defineMessages } from "react-intl";

export const messages = defineMessages({
  fullName: {
    id: 'header.fullName',
    defaultMessage: 'Full Name',
  },
  fyManagerChange: {
    id: 'header.fyManagerChange',
    defaultMessage: 'FY Manager Change',
  },
  conversation: {
    id: 'header.conversation',
    defaultMessage: 'Conversation',
  },
  conversationStatus: {
    id: 'header.conversationStatus',
    defaultMessage: 'Conversation Status',
  },
  //pending conversations table
  pendingConversations: {
    id: 'header.pendingConversations',
    defaultMessage: 'Pending Conversations',
  },
  confirmConversation : {
    id: 'header.confirmConversation',
    defaultMessage: 'I confirm that I have followed the conversation script for selected employees above and completed their conversation.',
  },
  completeConversationButton : {
    id: 'header.completeConversationButton',
    defaultMessage: 'Complete Conversations',
  },
  completeConversationTitle : {
    id: 'header.completeConversationTitle',
    defaultMessage: 'Complete Conversations',
  },
  
  saveAndCompleteConversationSuccessMessage: {
    id: 'header.saveAndCompleteConversationSuccessMessage',
    defaultMessage: 'Conversation completion status has been updated for the selected employee(s).',
  },
  cancel:{
    id: 'header.Cancel',
    defaultMessage: 'Cancel',
  },
  closeAriaLabel:{
    id: 'header.closeAriaLabel',
    defaultMessage: 'Close',
  }
});