import { IStyle, mergeStyleSets } from '@fluentui/react';
import { getScrollBarWidth } from '../core/utils';

const navCollapsedWidth = 0;

const scrollablePaneStyles = {
  position: 'fixed',
  top: 48,
  bottom: 0,
  right: 0,
};

export const shellStyles = mergeStyleSets({
  scrollablePaneCollapsed: {
    ...scrollablePaneStyles,
    left: navCollapsedWidth + getScrollBarWidth() , 
  } as IStyle,
  scrollablePaneExpand: {
    ...scrollablePaneStyles,
    left: 0,
  } as IStyle,
  rootDiv: {
    paddingRight: '0px',
    paddingLeft: '0px'
  } as IStyle,
  dividerLine: {
    width: '100%',
    height: '1px',
    backgroundColor: 'black',
    marginBottom: '20px'
  } as IStyle,
  rowGap: {
    height: '30px'
  } as IStyle,
  mainPanelCollapsed: {
    padding: '0px 0',
  } as IStyle,
  mainPanelExpand: {
    padding: '0 0',
  } as IStyle,
});

