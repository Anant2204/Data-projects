import React, { useContext } from 'react';
import { DataService } from '../../app/services';
import { DataServiceContext } from '../../app/context'
import { ServiceContext } from '@msx/platform-services';
import { IDataServiceContainer } from '../../app/interfaces';

export const AppDataServiceProvider: (React.FC) = props => {
  const { httpClient, authClient } = useContext(ServiceContext);
  const dataService = new DataService(httpClient, authClient);
  const dataServiceContainer: IDataServiceContainer = {
    dataService: dataService,
  }

  return (
    <DataServiceContext.Provider value={dataServiceContainer}>
      {props.children}
    </DataServiceContext.Provider>);
}
