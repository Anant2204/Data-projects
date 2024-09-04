import React from "react";
import { Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton } from "@fluentui/react";
import { messages } from "./oseDialog.messages";
import { injectIntl } from "react-intl";
import { IOseDialogProps } from "./oseDialogTypes";

const OSEDialog: React.FC<IOseDialogProps> = ({intl, isDialogVisible, handleDialogClose, title, subText,  yesButtonText  = intl.formatMessage(messages.yes), noButtonText = intl.formatMessage(messages.no) }) => {
    return (
        <Dialog
            hidden={!isDialogVisible}
            onDismiss={() => handleDialogClose(false)}
            dialogContentProps={{
                type: DialogType.normal,
                title: title,
                subText: subText,
            }}
            modalProps={{
                isBlocking: false,
                styles: { main: { maxWidth: 450 } },
            }}
        >
            <DialogFooter>
                <PrimaryButton onClick={() => handleDialogClose(true)} text={yesButtonText} />
                <DefaultButton onClick={() => handleDialogClose(false)} text={noButtonText} />
            </DialogFooter>
        </Dialog>
    );
};

export const OseDialog = injectIntl(OSEDialog);
