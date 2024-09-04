import { InjectedIntl } from 'react-intl';
import { messages } from './App.navigation.messages';
import { AppRoutePath } from './App.types';

export const getLeftNavMenuItems = (intl: InjectedIntl, history: any) => {

  const items = [
    // dashboard page
    // {
    //   name: intl.formatMessage(messages.dashboard),
    //   key: 'left_nav_menu_dashboard',
    //   ariaLabel: intl.formatMessage(messages.dashboard),
    //   icon: 'ViewDashboard',
    //   onClick: () => {
    //     history.push(AppRoutePath.Dashboard);
    //   },
    //   isSelected:
    //     window.location.href === window.location.protocol + '//' + window.location.host + AppRoutePath.Dashboard ? true : false,
    // },
  ];
  return items;

}

export const getExtraLeftNavMenuItems = (intl: InjectedIntl, history: any) => {

  const items =
  {
    key: "group2",
    name: "External apps links",
    groupTitleAttributes: {
      id: "nav_group_2"
    },
    links: [
      {
        name: "Help Documentation",
        key: "leftNavHelpDocumentation",
        ariaLabel: "Help Documentation",
        icon: "Help",
        url: "https://aka.ms/help"
      }
    ]
  };
  return items;
}
