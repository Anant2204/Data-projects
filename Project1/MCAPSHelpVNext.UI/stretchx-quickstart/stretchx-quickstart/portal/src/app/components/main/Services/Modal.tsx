import React, { useEffect } from 'react';
import { Modal } from '@fluentui/react/lib/Modal';
import { IconButton } from '@fluentui/react/lib/Button';
import * as msal from '@azure/msal-browser';


const ModalComponent = ({ isOpen, dismissModal, iframeUrl }) => {
  const iframeStyle = {
    width: '800px',
    height: '600px',
    border: 'none',
  };

  

  return (
    <Modal isOpen={isOpen} onDismiss={dismissModal} isBlocking={false}>
      <div>
        <IconButton
          iconProps={{ iconName: 'Cancel' }} // Use the Cancel icon for closing
          onClick={dismissModal}
          styles={{
            root: {
              position: 'absolute',
              top: 0,
              right: 0,
              zIndex: 1,
            },
          }}
        />
        <iframe src={iframeUrl} style={iframeStyle}></iframe>
      </div>
    </Modal>
  );
};

export default ModalComponent;
