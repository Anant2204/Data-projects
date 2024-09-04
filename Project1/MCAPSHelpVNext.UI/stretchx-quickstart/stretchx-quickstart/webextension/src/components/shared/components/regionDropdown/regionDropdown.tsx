import React, { useState, useMemo, useEffect } from 'react';
import { ComboBox, DropdownMenuItemType } from '@fluentui/react';
import regionmapping from './regionmapping.json';
import { IGroupedDropdownProps } from './regionDropdown.types';
import { dropdownStyles } from './regionDropdown.styles';

const GroupedDropdown = ({ selectedRegions, onSelect, defaultRegion, region, label, required = false, isButtonAriaHidden = false, onRenderLabel, disabled = false, onBlur, styles, id, defaultSelectedKey, arialabel }: IGroupedDropdownProps) => {
    const [selectedItem, setSelectedItem] = useState(region ? { key: region, text: region } : defaultRegion ? { key: defaultRegion, text: defaultRegion } : null);

    useEffect(() => {
        if (region === undefined && defaultRegion === undefined && defaultSelectedKey !== undefined && defaultSelectedKey !== "") {
            setSelectedItem({ key: defaultSelectedKey, text: defaultSelectedKey });
        }
    }, [region, defaultRegion, defaultSelectedKey]);

    const filteredOptions = useMemo(() => {
        const selectedRegionNames = selectedRegions?.map(region => region.text);

        return Object.keys(regionmapping?.areas).map(area => {
            const regions = regionmapping?.areas[area].regions
                .filter(region => selectedRegionNames?.includes(region?.name))
                .map(region => ({
                    key: region.name,
                    text: region.display_name,
                    indentation: true,
                }));

            if (regions.length === 0) {
                return null;
            }

            return {
                key: area,
                text: area,
                itemType: DropdownMenuItemType.Header,
                data: regions,
            };
        }).filter(Boolean).reduce((acc, val) => acc.concat(val.data.length > 0 ? [val, ...val.data] : [val]), []);
    }, [selectedRegions]);

    const onDropdownChange = (_, option) => {
        setSelectedItem(option);
        onSelect(option.key);
    };

    const customOptionRenderer = (option) => {
        if (option.itemType === DropdownMenuItemType.Header) {
            return <span style={dropdownStyles.header}>{option.text}</span>;
        } else {
            return (
                <span style={dropdownStyles.indentation}>
                    {option.text}
                </span>
            );
        }
    };

    return (
        <ComboBox
            label={label}
            required={required}
            disabled={disabled}
            selectedKey={defaultSelectedKey === "" ? null : selectedItem?.key}
            options={filteredOptions}
            onChange={onDropdownChange}
            onRenderOption={customOptionRenderer}
            isButtonAriaHidden={true}
            calloutProps={{ calloutMaxHeight: 300, doNotLayer: true }}
            styles={styles}
            onRenderLabel={onRenderLabel}
            onBlur={onBlur}
            id={id}
            defaultSelectedKey={defaultSelectedKey}
            aria-label={arialabel}
            aria-hidden={isButtonAriaHidden}
            allowFreeInput={true}
            autoComplete='on'
            useComboBoxAsMenuWidth={true}
        />
    );
};

export default GroupedDropdown;