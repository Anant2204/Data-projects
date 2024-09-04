import { InjectedIntl } from "react-intl";
import { messages } from "./AppLeftNav.messages";
import { IAppExtensionPage } from "@msx/platform-services";

const REPORTS = '4afa8f62-a142-11ed-a8fc-0242ac120010';
const PROXY_ASSIGNMENT = '4afa8f62-a142-11ed-a8fc-0242ac120011';
const EDM_LEAD_ASSIGNMENT = '4afa8f62-a142-11ed-a8fc-0242ac120013';

export const getConfig = (
  intl: InjectedIntl,
  isAppReady: boolean,
  history: any,
  extensionsPages: IAppExtensionPage[],
  isUserLoggedIn: boolean,
  navMenuIconClicked:()=> void,
  defaultFeature: string,
) => {
  if (!isAppReady) return [];
  const navLinkGroups = getMenuItems(
    intl,
    isAppReady,
    history,
    extensionsPages,
    isUserLoggedIn,
    navMenuIconClicked,
    defaultFeature,
  );
  return navLinkGroups;
};

const getMenuItems = (
  intl: InjectedIntl,
  isAppReady: boolean,
  history: any,
  extensionsPages: IAppExtensionPage[],
  isUserLoggedIn: boolean,
  navMenuIconClicked:()=> void,
  defaultFeature: string,
) => {
  if (!isAppReady) return [];

  const getlocaleText = (key: string, defaultValue: string) => {
    let result = defaultValue;
    const newKey = "leftNav_" + key.replace(/-/g, "_");
    const descriptor = messages[newKey];
    if (descriptor) result = intl.formatMessage(descriptor);
    return result;
  };

  const navMenuLinks = [
    // creating first left navigation menu group
    // to display manager extensions
    // {
    //   key: 'left_nav_manager_menu',
    //   name: intl.formatMessage(messages.managerGroupTitle),
    //   groupTitleAttributes: {
    //     id: 'left_nav_group_manager_menu',
    //   },
    //   links: [
    //   ],
    // },
    // // creating second left navigation menu group
    // // to display admin extension
    // {
    //   key: 'left_nav_admin_menu',
    //   name: intl.formatMessage(messages.adminGroupTitle),
    //   groupTitleAttributes: {
    //     id: 'left_nav_group_admin_menu',
    //   },
    //   links: [
    //   ],
    // },
  ];

  //creating dynamic extension links
  extensionsPages.forEach((page) => {
    if (
      page.showNavigation &&
      page.showNavigation === true &&
      !page.name.startsWith("admin")
    ) {
      if (
        navMenuLinks.find((x) => x.key === "left_nav_manager_menu") ===
        undefined
      ) {
        navMenuLinks.push({
          key: "left_nav_manager_menu",
          name: intl.formatMessage(messages.managerGroupTitle),
          groupTitleAttributes: {
            id: "left_nav_group_manager_menu",
          },
          links: [],
        });
      }

      navMenuLinks
        .find((x) => x.key === "left_nav_manager_menu")
        .links?.push({
          name: getlocaleText(page.key, page.description),
          key: page.key,
          ariaLabel: page.description,
          icon: page.icon,
          title:page.description,
          onClick: () => {
            history.push({ pathname: `/${page.routePath}` });
            navMenuIconClicked();
          },
          isSelected: page['featureMapping']?.includes(defaultFeature) ||
            window.location.href === 
            window.location.protocol +
              "//" +
              window.location.host + 
              `/${page.routePath}` 
              ? true
              : false,
        });
    } else if (
      page.showNavigation &&
      page.showNavigation === true &&
      page.name.startsWith("admin")
    ) {
      if (
        navMenuLinks.find((x) => x.key === "left_nav_admin_menu") === undefined
      ) {
        navMenuLinks.push({
          key: "left_nav_admin_menu",
          name: intl.formatMessage(messages.adminGroupTitle),
          groupTitleAttributes: {
            id: "left_nav_group_admin_menu",
          },
          links: [],
        });
      }
      navMenuLinks
        .find((x) => x.key === "left_nav_admin_menu")
        .links.push({
          name: getlocaleText(page.key, page.description),
          key: page.key,
          ariaLabel: page.description,
          icon: page.icon,
          title:page.description,
          onClick: () => {
            if(page.key === REPORTS)
              window.open(`${process.env.REACT_APP_REPORTS_URL}`, '_blank');
            else if (page.key === EDM_LEAD_ASSIGNMENT || 
                     page.key === PROXY_ASSIGNMENT)
              window.open(`${process.env.REACT_APP_POWERAPP_ADMIN_URL}`, '_blank');
            else 
              history.push({ pathname: `/${page.routePath}` });
            navMenuIconClicked();
          },
          isSelected: page['featureMapping']?.includes(defaultFeature) || 
            window.location.href ===
            window.location.protocol +
              "//" +
              window.location.host +
              `/${page.routePath}`
              ? true
              : false,
        });
    }
  });

  function hasChildren(links) {
    return links.length > 0;
  }

  function checkLinks(data) {
    for (const item of data) {
      if (!hasChildren(item.links)) {
        return false;
      }
    }
    return true;
  }
  //const isLinksPresent =  checkLinks(navMenuLinks);
  // if(!isLinksPresent)
  //   navMenuLinks.length = 0;
  return navMenuLinks;
};
