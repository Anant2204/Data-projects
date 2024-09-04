
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { IAppExtensionPage } from '@msx/platform-services';
import { Extension } from '../core/components'
import {
  NotFound,
} from './pages'

export interface Props {
  extensonPages: IAppExtensionPage[];
}

export const Routes: (React.FC<Props>) = (props) => {
  const { extensonPages } = props;

  const renderMain = (): JSX.Element => {
    return (
      <Switch>
        {/* Create route for dynamic extensions*/}
        {extensonPages.map((page) => {
          return <Route
            key={page.name}
            name={page.name}
            path={'/' + page.routePath}
            render={(): React.ReactElement => <Extension componentKey={page.key} />}
          />;
        })}
        
        {/* Create default dynamic extension which is consumption, consumption needs exact match for / and approx match for /consumption*/}
        {extensonPages.map((page) => {
          if (page.routePath === 'consumption')
            return <Route
              key={page.name}
              name={page.name}
              exact path={'/'}
              render={(): React.ReactElement => <Extension componentKey={page.key} />}
            />;
          else
            return null
        })}

        {/* Create not found pages route */}
        <Route component={NotFound} />
      </Switch>
    );
  }

  return renderMain();

}