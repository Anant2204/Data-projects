import * as React from 'react';
import { IDataServiceContext } from '../interfaces';

export const DataServiceContext: React.Context<IDataServiceContext> = React.createContext<IDataServiceContext>(
  // eslint-disable-next-line
  {} as IDataServiceContext
);
