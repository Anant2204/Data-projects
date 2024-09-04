import { Dropdown, Icon, Stack, TextField } from "@fluentui/react";
import React from "react";
import messages from "../PartnerRelated.messages";
export const InfoMessage =( classes)=>{
    return (
        <>
          <Stack
              horizontal
              tokens={{ childrenGap: 8 }}
              styles={{ root: { marginTop: 15 } }}
              verticalAlign="center">
              <Icon
                iconName="Info"
                styles={{ root: { fontSize: 16, color: "#0078d4" } }}
              />
              <span className={
                  classes?.isFormDataValid === true ? null : classes?.classes.requiredFormFieldMessage
                }>{messages.requiredFieldText.defaultMessage}</span>
            </Stack>

            <Stack
              horizontal
              tokens={{ childrenGap: 8 }}
              verticalAlign="center">
              <Icon
                iconName="Info"
                styles={{ root: { fontSize: 16, color: "#0078d4" } }}
              />
              <span>{messages.submitText.defaultMessage}</span>
            </Stack>
        </>
    )
}