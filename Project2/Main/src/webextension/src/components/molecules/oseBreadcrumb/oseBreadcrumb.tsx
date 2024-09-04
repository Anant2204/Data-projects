import { Breadcrumb, classNamesFunction } from '@fluentui/react';
import { getStyles } from "./oseBreadcrumb.styles";
import { getCurrentTheme } from '../../../utils';
import { IBreadcrumbComponentProps } from './oseBreadcrumb.types';
import React from 'react';
import ForwardSlash from '../../../images/slashForward.svg';
import { messages } from './messages';
import { injectIntl } from 'react-intl';

const getClassNames = classNamesFunction<any, any>();
let classes: any;

const OseBreadcrumb: React.FC<IBreadcrumbComponentProps> = (props) => {
  const { items, parentContext, intl } = props;
  const theme = getCurrentTheme(parentContext);
  classes = getClassNames(getStyles(theme));
  return <Breadcrumb items={items} overflowAriaLabel={intl?.formatMessage(messages.overflowBreadcrumbs)} className={classes.root} dividerAs={() => <ForwardSlash />} />;
};

export default injectIntl(OseBreadcrumb);