import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from "react-router";
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { MsxTileList, ApplicationContext } from '@msx/platform-services'
import { Extension } from '..';
import { Stack } from '@fluentui/react';
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { getStyles } from './TileList.styles';


const getClassNames = classNamesFunction<any, any>();
let classes: any;

interface OwnProps extends InjectedIntlProps {
  isEdit: boolean;
  sortableContainer?: any;
  sortableItem?: any;
}
type TileListProps = OwnProps & RouteComponentProps;


export const TileListComponent: (React.FC<TileListProps>) = props => {
  const { appState, extensionsRegistrationClient } = useContext(ApplicationContext);
  const tileExtensions = extensionsRegistrationClient.getExtensionsTiles();
  classes = getClassNames(getStyles, appState.theme);

  const getTiles = () => {
    const tiles = [];
    tileExtensions.forEach(tile => {
      if (tile.active) {
        tiles.push(
          <Extension componentKey={tile.key} key={tile.key} ignoreWrapControl={true} />
        );
      }
    });
    return tiles;
  }


  const renderMain = (): JSX.Element => {
    const tiles = getTiles();
    return (
      <Stack className={classes.root}>
        <MsxTileList tiles={tiles} />
      </Stack>
    );
  }
  return renderMain();

}
export const TileList = withRouter(injectIntl(TileListComponent));
