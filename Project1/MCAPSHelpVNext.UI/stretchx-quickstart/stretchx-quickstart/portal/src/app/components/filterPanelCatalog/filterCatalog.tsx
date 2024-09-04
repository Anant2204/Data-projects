import React,{useEffect, useState} from "react";
import { IFilterCategory, IFilterOption } from "./FilterPanel.types";
import { Stack, Checkbox, Text , classNamesFunction } from "@fluentui/react";
import { getStyles } from "./FilterPanel.style";
import { useDispatch, useSelector } from "react-redux";
let classes: any;
const getClassNames = classNamesFunction<any, any>();
interface IRenderCheckboxProps {
    obj: IFilterCategory;
    handleCheckboxChange: (key: string ,selected: any) => void;
    selectedItems: any
}

const CheckBoxContainer: React.FC<IRenderCheckboxProps> = ({
    obj,
    handleCheckboxChange,
    selectedItems
}) => {
    classes = getClassNames(getStyles());
    const { name, options , key } = obj;
    const stackContainerTokens = { childrenGap: 20 };
    const stackTokens = { childrenGap: 10 };
    const checkBoxChangeHandler = (key,id) =>{
        handleCheckboxChange(key , id);
    }
    return (
        <Stack.Item>
            <Stack horizontal horizontalAlign="space-between" className={classes.stackItemHeader}>
                <Text className="label" variant="xLarge">{name}</Text>
            </Stack>
            <Stack wrap tokens={stackContainerTokens}>
                <Stack.Item>
                    <Stack tokens={stackTokens} className={classes.leftFilterItemsContainer }>
                        {options.map((option: IFilterOption, index: number) => {
                            return (
                                <div className={classes.leftFilterItem} key={option.ID}>
                                    <Checkbox
                                        label={option.name}
                                        title={option.name}
                                        key={option.ID}
                                        checked={(selectedItems[key] && selectedItems[key][option.ID] !== undefined && selectedItems[key][option.ID] ) ? selectedItems[key][option.ID] : false}
                                        onChange={() => checkBoxChangeHandler(key, option.ID)}
                                    />
                                </div>
                            );
                        })}
                    </Stack>
                </Stack.Item>
            </Stack >
        </Stack.Item >
    );
};

export default CheckBoxContainer;
