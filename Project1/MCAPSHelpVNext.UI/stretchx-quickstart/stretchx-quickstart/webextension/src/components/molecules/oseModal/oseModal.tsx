import * as React from 'react';
import {
    Modal,
    mergeStyleSets,
    IIconProps,
    IconButton,
} from '@fluentui/react';
import { getOseModalStyles } from './oseModal.styles';
import { getCurrentTheme } from '../../../utils';

interface OseModalProps {
    titleAriaId: string;
    IsModalOpen: boolean;
    onDismissHandler: () => void;
    title: string;
    parentContext: any;
    children: React.ReactNode;
}

const cancelIcon: IIconProps = { iconName: 'Cancel' };
let modalClasses: any;
let contentStyles: any;

const OseModal: React.FC<OseModalProps> = (props: OseModalProps) => {
    const theme = getCurrentTheme(props.parentContext);
    modalClasses = getOseModalStyles(theme);
    contentStyles = mergeStyleSets({
        ...modalClasses.contentStyles,
    });

    return (
        <Modal
            titleAriaId={props.titleAriaId}
            isOpen={props.IsModalOpen}
            onDismiss={props.onDismissHandler}
            isBlocking={false}
            containerClassName={contentStyles.container}
        >
            <>
                <div className={contentStyles.header}>
                    <h2 className={contentStyles.heading} id={props.titleAriaId}>
                        {props.title}
                    </h2>
                    <IconButton
                        styles={modalClasses.iconButtonStyles}
                        iconProps={cancelIcon}
                        ariaLabel="Close popup modal"
                        onClick={props.onDismissHandler}
                    />
                </div>
                <div className={contentStyles.body}>{props.children}</div>
            </>
        </Modal>
    );
};

export default OseModal;
