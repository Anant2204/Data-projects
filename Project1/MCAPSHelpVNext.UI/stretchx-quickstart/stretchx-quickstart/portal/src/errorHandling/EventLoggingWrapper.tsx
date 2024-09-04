import React, { useEffect } from 'react';


const EventLoggingComponent = (WrappedComponent) => {
    const EnhancedComponent = (props) => {
     // Add event listeners for click and keypress events
     useEffect(() => {
        document.addEventListener('click', handleEvent);
        document.addEventListener('keypress', handleEvent);
  
        // Remove event listeners when the component unmounts
        return () => {
          document.removeEventListener('click', handleEvent);
          document.removeEventListener('keypress', handleEvent);
        };
      }, []);

const handleEvent = (event) => {

    const isClick = event.type === 'click';
    const isEnterKey = event.type === 'keydown' && event.keyCode === 13;
    const isSpacebar = event.type === 'keydown' && event.keyCode === 32;

    if (!isClick && !isEnterKey && !isSpacebar) {
      return;
    }

};
  
    return <WrappedComponent {...props} />;
  };

return EnhancedComponent;
};
export const EventLoggingWrapper = EventLoggingComponent;
