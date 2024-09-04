import React, { useContext, useState, useEffect } from 'react';
import './Tile.css';
import { injectIntl } from 'react-intl';
import { Icon } from '@fluentui/react/lib/Icon';
import { Modal } from '@fluentui/react';

interface TileDetailProps {
    isOpen: boolean;
    onClose: () => void;

  }
  


const TileDetailComponent: React.FC<TileDetailProps> = props => {
    const { isOpen, onClose } = props;
    if (!isOpen) {
        return null; // Don't render anything if the modal is closed
      }
  const renderMain = (): JSX.Element => {
    return (
          <div className='modalContainer'>
          <span ><h6>CPE Survey Suppresion expression</h6></span>
        <a><Icon iconName='ChevronLeft' onClick={onClose} className='iconModal' /></a>
          <div className='account'>
           Data for Account Data requests
          </div>
          <div className='secondAccount'>
          Data for pending Requests.
          </div>
          
        </div>
    );
  };

  return renderMain();
};

export const TileDetail = injectIntl(TileDetailComponent);

