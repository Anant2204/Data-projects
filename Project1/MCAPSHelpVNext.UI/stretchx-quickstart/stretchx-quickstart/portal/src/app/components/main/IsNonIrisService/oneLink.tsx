import React, { useContext, useState, useEffect } from 'react';

import { injectIntl } from 'react-intl';


import { useLocation } from 'react-router-dom';

const OneLinkComponent = () => {
  const location = useLocation();
  const { serviceRequestFormLink } = location.state || {};
  return (
    <div>  
       one link<br/>
      {serviceRequestFormLink}
  </div>
  

);

};
export const OneLink = injectIntl(OneLinkComponent);

