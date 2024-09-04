import * as React from "react";
import { IFilterCategory,IComponentAttributes,IFilterOption, ISelectedFilter } from './oseFilterPanel.types';
import { IconButton } from "@fluentui/react";
import { injectIntl } from "react-intl";
import { getStyles } from "./oseFilterPanel.style";
import { getCurrentTheme } from "../../../utils";
import { Stack, classNamesFunction } from "office-ui-fabric-react";
import { messages } from './oseFilterPanel.messages';
import RenderCheckBoxWithHeader from "./checkBoxContainer/checkBoxContainer";
import { orderBy } from "lodash";

let classes: any;
const getClassNames = classNamesFunction<any, any>();
const FilterLeftPanelComp: React.FC<IComponentAttributes> = (props) => {
  const { parentContext, filterOptions, onFilterChange, intl } = props;
  const [appliedFilters, setAppliedFilters] = React.useState<ISelectedFilter | null>(null);
  const [statefilterOptions, setFilterOptions] = React.useState<IFilterCategory[]>([]);
  const theme = getCurrentTheme(parentContext);
  classes = getClassNames(getStyles(theme));

  const onChange = (selected: IFilterOption[], key: string) => {
    const tempAppliedFilters = {...appliedFilters};
    tempAppliedFilters[key] = selected;
    setAppliedFilters(tempAppliedFilters);
    onFilterChange(tempAppliedFilters); 
  }

  const clearAllFilter = () => {
    const tempAppliedFilters = {...appliedFilters};
    tempAppliedFilters.templateType = [];
    tempAppliedFilters.solutionArea = [];
    setAppliedFilters(tempAppliedFilters);
    onFilterChange(tempAppliedFilters);

        
    const tempFilterOps = statefilterOptions.map((obj: IFilterCategory) => {
      // use lodash to sort obj.options      
       obj.options = orderBy(obj.options, "name", "asc").map((option) => {
         option.selected = false;
         return option;
       }); 
      return obj;      
    }); 

    setFilterOptions(tempFilterOps);
    
  }

  React.useEffect(() => {
    setFilterOptions(filterOptions);
  }, [ ])


  return (
    <>
        <div className={classes.filterHeader}>
            <div className={classes.filterHeaderLabel}>
                Filters
            </div>
            <div className={classes.filterClearAll} onClick={clearAllFilter} data-testid="btn-clearall" >
              <IconButton
                ariaLabel={intl.formatMessage(messages.clearAll)}
                iconProps={{
                  iconName: 'ClearFilter',
                  }}
               
                  title={intl.formatMessage(messages.clearAll)}       
              />
              <span className={classes.clearAllText} >Clear All</span>
            </div>
        </div>
        <Stack className={classes.filterContainerCls}>
          {
            statefilterOptions.map((obj: IFilterCategory) => {
              // Create a new IFilterCategory object with the sorted options array
              const sortedCategory: IFilterCategory = {
                name: obj.name,
                key: obj.key,
                options: orderBy(obj.options, "name", "asc"),
              };
              return <RenderCheckBoxWithHeader obj={sortedCategory } key={sortedCategory.key} onChange={onChange} parentContext={parentContext}/>
            })
          }
        </Stack>
    </>
  )
  
};

export const FilterLeftPanel = injectIntl(FilterLeftPanelComp);
