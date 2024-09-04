import React from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { getCurrentTheme } from '../../../utils';
import { getStyles } from "./oseFlyout.styles";
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { Stack } from 'office-ui-fabric-react';
import { IFlyoutProps } from './oseFlyout.types';

const getClassNames = classNamesFunction<any, any>();

export const Flyout: React.FunctionComponent<IFlyoutProps> = (
    { isOpen, onDismiss, onSave, onCancel, title, parentContext, panelSize = PanelType.medium, customWidth,
        footerButtons = [
            { text: 'Save', isPrimary: true },
            { text: 'Cancel', onClick: onCancel, isDefault: true }], children,
        saveButtonText = 'Save',
        cancelButtonText = 'Cancel',
        isSaveDisabled,
        handleSubmit,
        formstyle,
        isResetVisible = false,
        resetButtonText = 'Reset',
        isResetDisabled,
        onReset,
        showFooterButtons= true
    },
) => {
    const theme = getCurrentTheme(parentContext);
    formstyle = formstyle === undefined ? getClassNames(getStyles(theme)) : formstyle;

    const buttonStyles = { root: { marginRight: 8 } };
    const onRenderFooterContent = React.useCallback(
        () => (
            <div>
                {footerButtons.map((button) => (
                    button.isPrimary ? (
                        <>
                            <PrimaryButton
                                role='button'
                                key={1}
                                styles={buttonStyles}
                                disabled={isSaveDisabled}
                                onClick={handleSubmit}
                            >
                                {saveButtonText}
                            </PrimaryButton>
                            {
                                isResetVisible &&

                                <DefaultButton
                                    key={2}
                                    onClick={onReset}
                                    styles={buttonStyles}
                                    disabled={isResetDisabled}
                                >
                                    {resetButtonText}
                                </DefaultButton>

                            }
                        </>
                    ) : (
                        <DefaultButton
                            key={3}
                            onClick={onCancel}
                            styles={buttonStyles}
                        >
                            {cancelButtonText}
                        </DefaultButton>
                    )
                ))}

            </div>
        ),
        [footerButtons, onSave, onCancel],
    );

    return (
        <Panel
            isOpen={isOpen}
            onDismiss={onDismiss}
            headerText={title}
            closeButtonAriaLabel="Close"
            onRenderFooterContent={showFooterButtons && onRenderFooterContent}
            isFooterAtBottom={true}
            styles={formstyle}
            type={customWidth ? undefined : panelSize}
            customWidth={customWidth}
        >
            <Stack as="form" className={formstyle.form}>
                {children}
            </Stack>
        </Panel>

    );
};
