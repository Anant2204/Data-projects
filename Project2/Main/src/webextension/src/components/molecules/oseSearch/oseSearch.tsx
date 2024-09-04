import React from 'react';
import { SearchBox, classNamesFunction } from '@fluentui/react';
import { getStyles } from './oseSearch.styles';
import { getCurrentTheme } from '../../../utils';
import { ISearchProps } from './oseSearch.types';

const getClassNames = classNamesFunction<any, any>();
let classes: any;

export const OSESearch: React.FC<ISearchProps> = ({ onSearch, searchPlaceHolder, onClear, parentContext }) => {

    const theme = getCurrentTheme(parentContext);
    classes = getClassNames(getStyles(theme));

    return (
        <SearchBox
            placeholder={searchPlaceHolder}
            className={classes.root}
            onChange={(_, newValue) => {
                onSearch(newValue);
            }}
            tabIndex={0}
            onClear={onClear}
        />
    );
}

export const OseSearch = OSESearch;
