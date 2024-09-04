import React, { useContext } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { ScrollablePane } from '@fluentui/react';
import { ApplicationContext, } from '@msx/platform-services';
import { SearchProps } from './Search.types';
import { shellStyles } from '../../App.styles';
import { PageError, Extension, ExtensionTypes } from '../../../core/components';
import { parseQueryString } from '../../../core/utils';
import { getExtensionsError, } from '../../../core/store';


const SearchComponent: React.FC<SearchProps> = props => {
  const { appState, extensionsRegistrationClient } = useContext(ApplicationContext);
  const extensionsError = useSelector(getExtensionsError);
  const searchExtensions = extensionsRegistrationClient.getSearchExtensions();

  const renderDataLoadingErrorComponent = () => {
    return <PageError error={extensionsError} />
  }

  const renderBodyComponent = () => {
    if (extensionsError) {
      return renderDataLoadingErrorComponent();
    }
    let searchText = ''
    const params = parseQueryString(window.location.search);
    if (params && params.length > 0) {
      const searchParam = params.find(param => param.key === 'text');
      if (searchParam) {
        searchText = searchParam.value;
      }
    }

    return (
      <>
        {searchExtensions.map((extension) => {
          return (
            <div data-is-focusable={true} key={`div-${extension.globalSearchConfig.key}`}>
              <Extension
                key={`searchExtension-${extension.globalSearchConfig.key}`}
                componentKey={extension.globalSearchConfig.key}
                ignoreWrapControl={true}
                searchText={searchText}
                componentType={ExtensionTypes.Search}
                slimLayout={false}
              />
            </div>
          );
        })}
      </>
    );
  }

  const renderMain = (): JSX.Element => {
    return (
      <ScrollablePane id='ScrollablePaneRoot' className={appState.isNavCollapsed ? shellStyles.scrollablePaneCollapsed : shellStyles.scrollablePaneExpand}>
        <div className={appState.isNavCollapsed ? shellStyles.mainPanelCollapsed : shellStyles.mainPanelExpand}>
          {renderBodyComponent()}
        </div>
      </ScrollablePane>
    )
  }
  return renderMain();
}

export const Search = injectIntl(SearchComponent);
