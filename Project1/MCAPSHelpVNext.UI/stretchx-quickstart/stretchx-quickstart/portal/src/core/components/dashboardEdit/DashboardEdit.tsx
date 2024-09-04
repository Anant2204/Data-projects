import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from "react-router";
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Stack } from '@fluentui/react';
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { MsxDashboard, ApplicationContext, IDashboardTile, ExtensionEventTypes } from '@msx/platform-services'
import { getInDashboardEditMode, setInDashboardEditMode, } from '../../store';
import { fetchUserProfileSuccess, } from '../../../app/store'
import { IUserProfile } from '../../../app/interfaces';
import { getStyles } from './DashboardEdit.styles'
import { Extension } from '..';
import { messages } from './DashboardEdit.message';

interface OwnProps extends InjectedIntlProps {
  // TODO: any
}
type DashboardEditProps = OwnProps & RouteComponentProps;

const getClassNames = classNamesFunction<any, any>();
let classes: any;

export const DashboardEditComponent: (React.FC<DashboardEditProps>) = props => {
  const { intl } = props;
  const { extensionsRegistrationClient, appState } = useContext(ApplicationContext);
  const inDashboardEditMode = useSelector(getInDashboardEditMode);
  const tileExtensions = extensionsRegistrationClient.getExtensionsTiles();
  const reduxDispatch = useDispatch();
  classes = getClassNames(getStyles, appState.theme);
  let displayTiles: JSX.Element[];

  const dashboardComponentMessage = {
    dataLoadingText: intl.formatMessage(messages.dataLoadingText),
    dashboardHeadingText: intl.formatMessage(messages.dashboardHeadingText),
    revertToDefaultButtonText: intl.formatMessage(messages.revertToDefaultButtonText),
    addNewCardButtonText: intl.formatMessage(messages.addNewCardButtonText),
    cancelEditButtonText: intl.formatMessage(messages.cancelEditButtonText),
    editDashboardButtonText: intl.formatMessage(messages.editDashboardButtonText),
    doneEditingButtonText: intl.formatMessage(messages.doneEditingButtonText),
    addnewCardHeadingText: intl.formatMessage(messages.addnewCardHeadingText),
    addNewCardFooterAddButtonText: intl.formatMessage(messages.addNewCardFooterAddButtonText),
    addNewCardFooterCancelButtonText: intl.formatMessage(messages.addNewCardFooterCancelButtonText),
  };

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

  const handleSaveChanges = (userDashboardTiles: IDashboardTile[]) => {
    reduxDispatch(setInDashboardEditMode(false));
    const userProfile: IUserProfile = {
      userPreference: {
        tilesOrder: userDashboardTiles,
        locale: appState.locale,
        theme: appState.theme.name,
      }
    };
    reduxDispatch(fetchUserProfileSuccess(userProfile));
    const newEvent = new CustomEvent(ExtensionEventTypes.DASHBOARD_EDIT_ACTION_SAVE, { detail: { tiles: userDashboardTiles } });
    window.dispatchEvent(newEvent);

  }

  const handleBeginChanges = () => {
    reduxDispatch(setInDashboardEditMode(true));
  }

  const handleCancelChanges = () => {
    reduxDispatch(setInDashboardEditMode(false));
  }

  const SortableItem = SortableElement(({ value }) => {
    return value;
  });

  const SortableList = SortableContainer(({ items }) => {
    return <Stack horizontal wrap className={classes.root}>
      {items.map((value, index) => {
        return <SortableItem
          key={`item-${value}-${index}`}
          index={index}
          value={value}
          disabled={!inDashboardEditMode}
        />
      })
      }
    </Stack>
  });

  const renderTiles = (): JSX.Element[] => {
    return displayTiles.map((tile, i) => {
      return (
        <Stack.Item key={i}>
          <section className={classes.tile} style={{ cursor: inDashboardEditMode ? 'move' : 'auto' }}>
            {tile}
          </section>
        </Stack.Item >
      );
    });
  };

  const renderBody = (tiles: JSX.Element[], state: any): JSX.Element => {
    if (!tiles) return null;
    displayTiles = tiles;
    return (
      <Stack >
        <SortableList
          items={renderTiles()}
          onSortEnd={({ oldIndex, newIndex }) => state.onSortEnd({ oldIndex, newIndex })}
          axis={'xy'}
          useDragHandle={false}
          distance={5}
        />
      </Stack>
    );
  }

  const renderMain = (): JSX.Element => {
    if (!appState.appConfig.registrationConfig.active) return null;
    if (tileExtensions.length === 0) return null;

    const tiles = getTiles();
    return (
      <Stack>
        <Stack.Item>
          <MsxDashboard
            tiles={tiles}
            onRenderBody={renderBody}
            onBeginChanges={handleBeginChanges}
            onCancelChanges={handleCancelChanges}
            onSaveChanges={handleSaveChanges}
            messages={dashboardComponentMessage}
          />
        </Stack.Item>
      </Stack>
    );
  }
  return renderMain();

}
export const DashboardEdit = withRouter(injectIntl(DashboardEditComponent));
