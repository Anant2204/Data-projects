import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import { InjectedIntlProps } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Label, ILabelStyles } from '@fluentui/react/lib/Label';
import { Pivot, PivotItem } from '@fluentui/react/lib/Pivot';
import { IStyleSet } from '@fluentui/react/lib/Styling';
import { Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react/lib/Dropdown';
import { Stack, IStackTokens, IStackStyles } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { DefaultButton } from '@fluentui/react';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { ApplicationContext } from '@msx/platform-services'
import { messages } from './Settings.messages';
import { ExtensionEventTypes } from '@msx/platform-services';
import {
  getCurrentTheme,
  setCurrentTheme,
  getCurrentLocale,
  setCurrentLocale,
} from '../../../core/store';

import { getThemeByName } from '../../../core/utils'

interface OwnProps {
  onDismissPanel: () => void;
}

type Props = OwnProps & InjectedIntlProps & RouteComponentProps;

const SettingsComponent: (React.FC<Props>) = (props) => {
  const { intl } = props;
  const currentTheme = useSelector(getCurrentTheme);
  const currentLocale = useSelector(getCurrentLocale);
  const { appState } = useContext(ApplicationContext);
  const [selectedLanguageItem, setSelectedLanguageItem] = React.useState<IDropdownOption>();
  const [selectedThemeName, setSelectedThemeName] = React.useState<string>(currentTheme.name);
  const reduxDispatch = useDispatch();
  const stackTokens = { childrenGap: 20 };
  const stackStyles: Partial<IStackStyles> = { root: { marginTop: 20 } };

  useEffect(() => {
    // Placeholder
    // eslint-disable-next-line
  }, []);

  const getDisplayLocales = () => {
    let result = [];
    if (!appState.appConfig.languageConfig.active) {
      return result;
    }
    const locales = appState.appConfig.languageConfig.locales;
    Object.keys(locales).forEach(function (key, idx) {
      result.push(
        {
          key: key,
          text: locales[key]
        });
    });
    return result;
  }

  const languageItems = getDisplayLocales();

  const handleLanguageChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    setSelectedLanguageItem(item);
    localStorage.setItem('locale', item.key as string);

  };

  const handleThemeChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption): void => {
    setSelectedThemeName(option.key);
    const newTheme = getThemeByName(option.key);
    reduxDispatch(setCurrentTheme(newTheme));
    localStorage.setItem('theme', option.key);
    document.body.style.background = newTheme.palette.white;
    if (appState.appConfig.enableUserSettingsApi) {
      const newEvent = new CustomEvent(ExtensionEventTypes.THEME_CHANGED, { detail: { theme: newTheme } });
      window.dispatchEvent(newEvent);
    }

  };

  const handleApplyButonClick = () => {
    if (appState.appConfig.enableUserSettingsApi) {
      const newEvent = new CustomEvent(ExtensionEventTypes.LOCALE_CHANGED, { detail: { locale: selectedLanguageItem.key } });
      window.dispatchEvent(newEvent);
    }
    reduxDispatch(setCurrentLocale(selectedLanguageItem.key));
  }

  const handleDiscardButtonClick = () => {
    setSelectedLanguageItem(undefined);
  }

  const renderThemeSection = () => {
    if (!appState.appConfig.themeConfig.active) {
      return null;
    }
    const choiceStyles = { root: { marginRight: '20px' } };

    const options: IChoiceGroupOption[] = [
      { key: 'default', text: intl.formatMessage(messages.themeLightText), iconProps: { iconName: 'ReadingMode' }, styles: choiceStyles, },
      { key: 'dark', text: intl.formatMessage(messages.themeDarkText), iconProps: { iconName: 'ReadingModeSolid' }, styles: choiceStyles, },
    ];

    return (
      <Stack tokens={stackTokens} styles={stackStyles}>
        <ChoiceGroup
          label={intl.formatMessage(messages.themeSelectionTile)}
          defaultSelectedKey={selectedThemeName}
          options={options}
          onChange={handleThemeChange}
        />
      </Stack>
    );
  }

  const renderGeneralTab = () => {
    // you can have multiple section within general tab
    return (
      <>
        {renderThemeSection()}
      </>
    );
  }

  const renderLanguageTab = () => {
    if (!appState.appConfig.languageConfig.active) {
      return null;
    }
    const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { marginTop: 5 } };
    const labelTitleStyles: Partial<IStyleSet<ILabelStyles>> = {
      root: { padding: 0 },
    };

    const stackButtonsTokens: IStackTokens = { childrenGap: 10 };
    const shouldDisableSave = (selectedLanguageItem && currentLocale !== selectedLanguageItem.key) ? false : true;
    return (
      <PivotItem headerText={intl.formatMessage(messages.languageTabTile)}>
        <Stack tokens={stackTokens} styles={stackStyles}>
          <Stack >
            <Label styles={labelTitleStyles}>{intl.formatMessage(messages.languageSelectionTile)}</Label>
            <Text variant="smallPlus">{intl.formatMessage(messages.languageSelectionSubTile)}</Text>
            <Dropdown
              selectedKey={selectedLanguageItem ? selectedLanguageItem.key : currentLocale}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={handleLanguageChange}
              options={languageItems}
              styles={dropdownStyles}
            />
          </Stack>
          <Stack>
            <Stack horizontal tokens={stackButtonsTokens}>
              <DefaultButton text={intl.formatMessage(messages.applyButtonText)} onClick={handleApplyButonClick} disabled={shouldDisableSave} />
              <DefaultButton text={intl.formatMessage(messages.discardButtonText)} onClick={handleDiscardButtonClick} disabled={shouldDisableSave} />
            </Stack>
          </Stack>
        </Stack>
      </PivotItem>
    );
  }

  const renderMain = (): JSX.Element => {
    return (
      <Pivot aria-label={intl.formatMessage(messages.settingsPanelAriaLable)}>
        <PivotItem
          headerText={intl.formatMessage(messages.generalTabTile)}
          headerButtonProps={{
            'data-order': 1,
            'data-title': intl.formatMessage(messages.generalTabTile),
          }}
        >
          {renderGeneralTab()}
        </PivotItem>
        {renderLanguageTab()}
      </Pivot>
    );
  }

  return renderMain();

}
export const Settings = withRouter(injectIntl(SettingsComponent));


