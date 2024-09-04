import React from 'react';
import { IAppExtensionPage } from '@msx/platform-services';
import { Routes } from './App.routes';
import RequestAccess from './RequestAccess'; // Import the RequestAccess component
import { Shell } from '../core/components/shell/Shell';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ErrorBoundary from '../errorHandling/errorBoundry';


export interface Props {}

export const App: React.FC<Props> = (props) => {
  const renderRoutes = (extensonPages: IAppExtensionPage[]) => {
    return <Routes extensonPages={extensonPages} />;
  };

  const renderMain = () => {
    return (

      <div  style={{backgroundColor:"#F5F5F5"}}>
      <ErrorBoundary>
        <Router>
          <Shell onRenderRoutes={renderRoutes} />
        </Router>
      </ErrorBoundary>
      {/* <AppFooter /> */}
    </div>

    );
  };

  return renderMain();
};