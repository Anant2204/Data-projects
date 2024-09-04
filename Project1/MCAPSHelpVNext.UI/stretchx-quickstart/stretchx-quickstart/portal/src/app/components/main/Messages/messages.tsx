import React, { useState,useEffect } from 'react';
import '../Messages/messages.css';
import successIco from "./success.png";

const Message = ({ type, duration = 2000}) => {
  const [isClosed, setIsClosed] = useState(true);

  const handleClose = () => {
    setIsClosed(true);
    if(isClosed)
    {
        let messagediv = document.getElementById("actmessages");
        messagediv.style.display = "none";
    }
  };

  

  const getClassName = () => {
    let baseClassName = '';
    switch (type) {
      case 'success':
        baseClassName = 'message-success';
        break;
      case 'fail':
        baseClassName = 'message-fail';
        break;
      case 'warning':
        baseClassName = 'message-warning';
        break;
      default:
        break;
    }
    return isClosed ? `${baseClassName} closed` : baseClassName;
  };

  const getIconPath = () => {
    switch (type) {
      case 'success':
        return successIco;
      case 'fail':
        return successIco;
      case 'warning':
        return successIco;
      default:
        return '';
    }
  };

  const setTitle = () => {
    switch (type) {
      case 'success':
        return 'Success';
      case 'fail':
        return 'Failed';
      case 'warning':
        return 'Warning';
      default:
        return '';
    }
  };

 
  let isAnnoucemntMessgae =  sessionStorage.getItem('_announcement');


  return (
    <div id="actmessages" 
    style={{
      display: 'none',
      position: 'fixed',
      width: '100%',
      zIndex: '1000',
      marginTop: isAnnoucemntMessgae === 'true' ? '0' : '48px'
    }}    
    >
    <div className={getClassName()}>
         <img className="message-icon" src={getIconPath()} alt={`${type} icon`} />
         <span className='message-title'>{setTitle()}</span><p className="message-text"></p>
         <span className="close-icon" onClick={handleClose}>&times;</span>
      </div>
    </div>
  );
};

export default Message;
