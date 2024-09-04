import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { getConfig } from './AppLeftNav.config';
import { RouteComponentProps } from 'react-router';
import { CoherenceNav } from '@coherence-design-system/controls';
import { LeftNavProps } from './AppLeftNav.types';
import { useSelector } from 'react-redux';
import { getUserPrivilege } from '../../store/selectors/userPrevilege.selectors';
import { Icon } from '@fluentui/react';
import { getStyles } from "./AppLeftNav.styles";
import { classNamesFunction } from "@fluentui/react";

type Props = LeftNavProps & RouteComponentProps;
let classes: any;
const REPORTS = '4afa8f62-a142-11ed-a8fc-0242ac120010';
const PROXY_ASSIGNMENT = '4afa8f62-a142-11ed-a8fc-0242ac120011';
const EDM_LEAD_ASSIGNMENT = '4afa8f62-a142-11ed-a8fc-0242ac120013';


const filterMenuitemsBasedOnRole = (extensionsPages,userPrevilegeData) => {
  const arr = [];
  extensionsPages?.forEach((page)=> {
    const foundPermission = userPrevilegeData?.permissions?.filter(permission =>{
      return page.featureMapping?.includes(permission.featureName)
      });
    if(foundPermission?.length > 0){
      arr.push(page); 
    }
  });
  return arr;
};

const addExternalLink = (key: string) => {
  if (key == REPORTS ||
    key == EDM_LEAD_ASSIGNMENT ||
    key == PROXY_ASSIGNMENT) {
    return <Icon iconName='NavigateExternalInline' className={classes.externalLink} />
  }
  return null;
}

const AppLeftNavComponent: React.FC<Props> = (props) => {
  const { history, theme } = props;
  const getClassNames = classNamesFunction<any, any>();
  classes = getClassNames(getStyles(theme));
  const userPrevilegeData = useSelector(getUserPrivilege);
  const navStyles: any = {
    navContainer: {
      //backgroundColor: "white",
      transition: 'width 0s ease-in-out',
    }, 
    mobileNavWrapper: {
      background: theme.palette.neutralQuaternaryAlt,
      height: '100vh',
      marginTop: '0px',
    },
  };

  const [defaultFeature, setDefaultFeature] = useState('');
  useEffect(() => {
    const defaultFeatureName = userPrevilegeData?.data?.defaultFeatures[0]?.defaultFeature ? userPrevilegeData?.data?.defaultFeatures[0]?.defaultFeature : null;
    if(window.location.pathname === '/') {
    setDefaultFeature(defaultFeatureName);
    }
  }, [userPrevilegeData]);
  const [isIconClicked,setIsIconClicked] = useState(false);
  // This is callback function to handle the click event of the icon.
  const navMenuIconClicked = () => {
    setIsIconClicked(true);
    setDefaultFeature('');
  }

  useEffect(() => {
    const element=document.querySelector('#main').firstChild as HTMLElement;
    if(element?.style){
      if(props.isNavCollapsed)
        element.style.left='48px'
      setIsIconClicked(false);
    }
  },[isIconClicked])

  const renderLeftNav = () => {
    const { intl, isAppReady, extensionsPages, isUserLoggedIn } = props;
    
    const newMenus = filterMenuitemsBasedOnRole(extensionsPages,userPrevilegeData?.data);
    let layoutConfig = getConfig(intl, isAppReady, history, newMenus, isUserLoggedIn,navMenuIconClicked, defaultFeature);
    // This code is added to include an external link icon after the name. 
    layoutConfig = layoutConfig.map(group => ({
      ...group,
      links: group.links.map(link => ({
        ...link,
        name: (
          <>
            {link.name}
            {addExternalLink(link.key)}
          </>
        ),
      })),
    }));
    
    return (
      <CoherenceNav
        appName={props.appName}
        groups={layoutConfig}
        onNavCollapsed={props.onNavCollapsed}
        styles={navStyles}
      />
    );
  }

  const renderMain = (): JSX.Element => {
    if (props.isNavCollapsed || userPrevilegeData?.status === 200)
      return renderLeftNav();

      return null;
  }
  return renderMain();
}

export const AppLeftNav = withRouter(injectIntl(AppLeftNavComponent));