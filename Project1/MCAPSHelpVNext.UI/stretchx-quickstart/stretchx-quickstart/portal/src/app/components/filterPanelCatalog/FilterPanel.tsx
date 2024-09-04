import * as React from "react";
import { IFilterCategory, IComponentAttributes, IFilterOption, ISelectedFilter } from './FilterPanel.types';
import { injectIntl } from "react-intl";
import { Icon, classNamesFunction } from "@fluentui/react";
import RenderCheckBoxWithHeader from "./filterCatalog";
import { orderBy } from "lodash";
import { getStyles } from "./FilterPanel.style";
import { getConsumptionAPI } from "../../utils/httpUtils";
import { ServiceContext } from "@msx/platform-services";
import '@fluentui/react/dist/css/fabric.css';
import { useDispatch } from "react-redux";
import { SETChileComponentName, SETIsCustomeLog, SETLogEventData,setSelectedCategories } from '../../../core/store';
import  ReactDOM  from "react-dom";
import TagsContainer from "./TagsContainer";
import * as Constants from "../../utils/constants";

let classes: any;
const getClassNames = classNamesFunction<any, any>();
classes = getClassNames(getStyles());
export interface FilterLeftPanelProps {
  selectedFilters: any[];
  handleFilterSelect: (filter: any) => void;
}
const FilterLeftPanelComp: React.FC<FilterLeftPanelProps & IComponentAttributes> = (props) => {
  const { intl, selectedFilters, handleFilterSelect } = props;
  const [appliedFilters, setAppliedFilters] = React.useState<ISelectedFilter>({});
  const [statefilterOptions, setFilterOptions] = React.useState<IFilterCategory[]>([]);
  const [selectedCheckboxIds, setSelectedCheckboxIds] = React.useState<number[]>([]);
  const context = React.useContext(ServiceContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState({});
  const reduxDispatch = useDispatch();
  const clearAllFilter = () => {
    setSelectedItems({});
  }

  React.useEffect(() => {
    if (statefilterOptions.length === 0) {
      onFilterOptions();
    }
  }, [])

  const onFilterOptions = async () => {
    try {
      setIsLoading(true);
      if (context) {
        const response = await getConsumptionAPI(
          "/api/Services/GetCatalogFilters",
          context.authClient
        );
        if (response?.data) {
          console.log("Response data:", response.data);
          const transformedData: IFilterCategory[] = Object.keys(response?.data).map(key => ({
            name: key,
            key: key,
            options: response.data[key].map((item: { ID: number, Name: string }) => ({
              ID: item.ID,
              name: item.Name,
              selected: false // You may need to adjust this if some options are initially selected
            }))
          }));
          setFilterOptions(transformedData);
        } else {
          throw new Error("Failed to fetch data.");
        }
      }
    } catch (error) {
      console.error("An error occurred while fetching data.", error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleCheckboxChange = async (category, id) => {
    console.log(selectedItems, "selectdItems");
    console.log(JSON.stringify(statefilterOptions), "statefilterOptionswef");
   // Start Event Logging //
   await reduxDispatch(SETChileComponentName('Catalog Filter'));  
   await reduxDispatch(SETLogEventData(
     {
       elementName:"Catalog Filter checkbox change",
       elementId:"",
     }
    ));
   await reduxDispatch(SETIsCustomeLog(true));

     // End Event Logging //
     
    const data = statefilterOptions.filter((item) => item.key === category)[0].options
    if (id === 1) {
      const allSelected = Object.keys(data).reduce((acc, curr) => {
        acc[data[curr].ID] = !selectedItems[category]?.[1];
        return acc;
      }, {});
      setSelectedItems({
        ...selectedItems,
        [category]: {
          ...allSelected
        }
      })
    } else {
      const updatedSelectedItems = {
        [category]: {
          ...selectedItems[category],
          [id]: !selectedItems[category]?.[id]
        }
      };
      const categoryData = data;
      const allOptionsSelected = categoryData.every(item => {
        const itemId = item.ID.toString();
        return itemId === '1' || updatedSelectedItems[category]?.[itemId];
      });

      updatedSelectedItems[category]['1'] = allOptionsSelected;
      setSelectedItems({
        ...selectedItems,
        ...updatedSelectedItems
      });
    }
  };


  React.useEffect(() => {
    const outputObj = {};
    for (const category in selectedItems) {
      const selectedOptions = [];
      for (const key in selectedItems[category]) {
        if (selectedItems[category][key]) {
          selectedOptions.push(parseInt(key));
        }
      }
      outputObj[category] = selectedOptions;
    }
    console.log(outputObj , "outputObj");
    
    reduxDispatch(setSelectedCategories(outputObj));
    const TagContainer = document.getElementById("tagsContainer");
    ReactDOM.render(<TagsContainer selectdItems={selectedItems} 
      statefilterOptions={statefilterOptions}
      handleRemoveSelectedValue={handleRemoveSelectedValue}
      GenrateTags={GenrateTags()}
    /> , TagContainer);
  }, [selectedItems]);

  const GenrateTags = () =>{
    return(
      <>
       { statefilterOptions.length > 0  && Object.entries(selectedItems).length > 0 && 
         <div>
         <ul className={classes.filterlist}>
          {
             Object.entries(selectedItems).map(([key, values]: [string, any]) => {
              return (
              
                    Object.entries(values).length > 0 && Object.keys(values).map(itemKey => {
                      if (values[itemKey]) {
                        const selectedItem = statefilterOptions.find(option => option.key === key)?.options.find(option => option.ID.toString() === itemKey);
                        if (selectedItem) {
                          return (
                            <li key={itemKey} className={classes.filterSubList}>{selectedItem.name}
                              <Icon   onClick={() => handleRemoveSelectedValue(key, parseInt(itemKey))} style={{ fontSize: "12px", cursor: "pointer", paddingLeft:"8px" }} iconName="cancel" />
                            </li>
                          );
                        }
                      }
                      return <></>;
                    })
              );
            })}
          {/* } */}
       
        </ul>
          </div>
  }
      </>
    )
  }

  const handleRemoveSelectedValue = (category: string, id: number) => {
    const updatedSelectedItems = { ...selectedItems };
    updatedSelectedItems[category][id] = false; // Set the selected value to false
    setSelectedItems(updatedSelectedItems); // Update the state
  };
  return (
    <>
      <div className={classes.filterHeader}>
        <div className={classes.filterHeaderLabel}>Filters</div>
        <div className={classes.filterClearAll} onClick={clearAllFilter} data-testid="btn-clearall" >
          <span className={classes.clearAllText} >Clear All</span>
        </div>
      </div>
     <span className={classes.filterContainerCls}>
      {statefilterOptions.map((obj: IFilterCategory) => {
        if (obj.name === Constants.MCEM_STAGE) {
          const sortedOptions = obj.options.slice().sort((a, b) => {
            // Move "MCEM Agnostic" to the end
            if (a.name === Constants.MCEM_AGNOSTIC) return 1;
            if (b.name === Constants.MCEM_AGNOSTIC) return -1;
            return 0;
          });
          return (
            <RenderCheckBoxWithHeader
              obj={{ ...obj, options: sortedOptions }}
              key={obj.key}
              handleCheckboxChange={handleCheckboxChange}
              selectedItems={selectedItems}
            />
          );
        } else {
          // Render categories other than MCEM Stage
          const sortedCategory: IFilterCategory = {
            name: obj.name,
            key: obj.key,
            options: orderBy(obj.options, "name", "asc"),
          };
          return (
            <RenderCheckBoxWithHeader
              obj={sortedCategory}
              key={sortedCategory.key}
              handleCheckboxChange={handleCheckboxChange}
              selectedItems={selectedItems}
            />
          );
        }
      })}
    </span>
    </>
  );
};

export const FilterLeftPanel = injectIntl(FilterLeftPanelComp);
