import { makeStyles } from '@fluentui/react-components';
 
// Define your custom styles
export const getStyles = makeStyles({
  completeConversationButton: {
    width: '200px', 
    marginLeft: "5px",
    marginRight: "10px"
  },
  cancelButton: {
    marginBottom: '3px !important'
  },
  completeButton:{
    paddingTop: '15px',
    display: 'flex',
    justifyContent: 'flex-end',
  }
});