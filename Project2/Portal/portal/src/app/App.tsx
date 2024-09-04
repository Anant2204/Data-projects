import React from 'react';
import { IAppExtensionPage } from '@msx/platform-services';
import { Shell } from '../core/components'
import { Routes } from './App.routes';

export interface Props {
}

export const App: (React.FC<Props>) = (props) => {

  const renderRoutes = (extensonPages: IAppExtensionPage[]) => {
    return <Routes extensonPages={extensonPages} />
  }

  const renderMain = () => {
    return <Shell onRenderRoutes={renderRoutes} />
  }

  return renderMain();
}


