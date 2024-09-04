import React, { useState } from "react";
import {
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
} from "@fluentui/react";
import {
  ChoiceGroup,
} from "@fluentui/react/lib/ChoiceGroup";
import { messages } from "./oseDialogWithOptions.messages";
import { injectIntl } from "react-intl";
import {
  IOseDialogWithOptionsProps,
} from "./oseDialogWithOptions.Types";

const OSEDialogOptions: React.FC<IOseDialogWithOptionsProps> = ({
  intl,
  isDialogVisible,
  handleDialogClose,
  title,
  subText,
  optionsData,
  yesButtonText = intl.formatMessage(messages.yes),
  noButtonText = intl.formatMessage(messages.no),
  anyOtherInput,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(null);

  const handleDialogSave = () =>
    handleDialogClose({
      yesSelected: true,
      selectedOption: selectedOption || optionsData?.defaultSelectedKey || optionsData?.options[0]?.key,
      anyOtherOutput: anyOtherInput,
    });

    const dragOptions = {
      moveMenuItemText: 'Move',
      closeMenuItemText: 'Close',
      menu: null,
    };
 
  return (
    <Dialog
      minWidth={450}
      hidden={!isDialogVisible}
      onDismiss={() =>
        handleDialogClose({
          yesSelected: false,
          selectedOption: null,
          anyOtherOutput: null,
        })
      }
      dialogContentProps={{
        type: DialogType.normal,
        title: title,
        subText: subText,
      }}
      modalProps={{
        isBlocking: false,
        dragOptions: dragOptions,   
      }}
    >
      {optionsData && optionsData.options.length > 0 && (
        <ChoiceGroup
          defaultSelectedKey={
            optionsData.defaultSelectedKey ?? optionsData.options[0]?.key
          }
          options={optionsData?.options}
          onChange={(ev, option) => {
            setSelectedOption(option?.key);
          }}
        />
      )}
      <DialogFooter>
        <PrimaryButton
          onClick={() => handleDialogSave()}
          text={yesButtonText}
        />
        <DefaultButton
          onClick={() =>
            handleDialogClose({
              yesSelected: false,
              selectedOption: null,
              anyOtherOutput: null,
            })
          }
          text={noButtonText}
        />
      </DialogFooter>
    </Dialog>
  );
};

export const OseDialogWithOptions = injectIntl(OSEDialogOptions);
