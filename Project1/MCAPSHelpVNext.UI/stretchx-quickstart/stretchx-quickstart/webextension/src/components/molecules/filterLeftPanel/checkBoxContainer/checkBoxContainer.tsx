import * as React from "react";
import { IFilterCategory, IFilterOption } from "../oseFilterPanel.types";
import { Stack, Checkbox, Text } from "@fluentui/react";
import { classNamesFunction } from "office-ui-fabric-react";
import { getStyles } from "../oseFilterPanel.style";
import { getCurrentTheme } from "../../../../utils";

let classes: any;
const getClassNames = classNamesFunction<any, any>();
interface IRenderCheckboxProps {
    obj: IFilterCategory;
    onChange: (selected: IFilterOption[], key: string) => void;
    parentContext: any;
}

const checkBoxContainer: React.FC<IRenderCheckboxProps> = ({
    obj,
    onChange,
    parentContext,
}) => {
    const theme = getCurrentTheme(parentContext);
    classes = getClassNames(getStyles(theme));

    const onOptionChange = (e: any, index: number) => {
        const { options, key } = obj;
        const tempOptions = [...options];

        if (!e.target.checked) {
            tempOptions[index].selected = false;
        } else {
            tempOptions[index].selected = true;
        }

        const tempS = tempOptions.filter((item) => item.selected === true);

        onChange(tempS, key);
    };

    const stackContainerTokens = { childrenGap: 20 };
    const stackTokens = { childrenGap: 10 };
    const { name, options } = obj;

    return (
        <Stack.Item>
            <Stack horizontal horizontalAlign="space-between" className={classes.stackItemHeader}>
                <Text className="label" variant="xLarge">{name}</Text>
                {/* Todo Add Filter functionality */}
                {/* <IconButton
          iconProps={{
            iconName: "",
          }}
          onClick={() => {}}
        /> */}
            </Stack>
            <Stack wrap tokens={stackContainerTokens}>
                <Stack.Item>
                    <Stack tokens={stackTokens} className={classes.leftFilterItemsContainer }>
                        {options.map((option: IFilterOption, index: number) => {
                            return (
                                <div className={classes.leftFilterItem} key={option.name}>
                                    <Checkbox
                                        label={option.name}
                                        title={option.name}
                                        key={option.name}
                                        checked={option.selected === true}
                                        onChange={(e) => onOptionChange(e, index)}
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

export default checkBoxContainer;
