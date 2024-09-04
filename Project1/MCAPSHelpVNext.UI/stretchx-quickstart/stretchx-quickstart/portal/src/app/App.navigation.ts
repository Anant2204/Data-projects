import { InjectedIntl } from 'react-intl';
import { messages } from './App.navigation.messages';
import { AppRoutePath } from './App.types';

export const getLeftNavMenuItems = (intl: InjectedIntl, history: any) => {

  const items = [
    // dashboard page
    {
      name: intl.formatMessage(messages.dashboard),
      key: 'left_nav_menu_dashboard',
      ariaLabel: intl.formatMessage(messages.dashboard),
      icon: 'ViewDashboard',
      onClick: () => {
        history.push(AppRoutePath.Dashboard);
      },
      isSelected:
        window.location.href === window.location.protocol + '//' + window.location.host + AppRoutePath.Dashboard ? true : false,
    },
    // to do list page
    {
      name: intl.formatMessage(messages.todolist),
      key: 'left_nav_menu_todolist',
      ariaLabel: intl.formatMessage(messages.todolist),
      icon: 'PageHeaderEdit',
      onClick: () => {
        history.push(AppRoutePath.ToDoList);
      },
      isSelected:
        window.location.href === window.location.protocol + '//' + window.location.host + AppRoutePath.ToDoList ? true : false,
    },
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
        name: "StretchX Documentation",
        key: "leftNavStretchXDocumentation",
        ariaLabel: "StretchX Documentation",
        icon: "Help",
        url: "https://aka.ms/stretchX"
      },
      {
        name: "StretchX Team channel",
        key: "leftNavStretchXTeam",
        ariaLabel: "StretchX Team channel",
        icon: "TeamsLogo",
        url: "https://teams.microsoft.com/l/channel/19%3a0ad5b33de6df4148b303ae936d64a050%40thread.tacv2/General?groupId=24c4f5ed-bdd0-437c-be3b-413d46e79b08&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47"
      },
    ]
  };
  return items;
}
