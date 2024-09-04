
import React, { FC } from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Text, Stack, IStackStyles } from '@fluentui/react';
import { ClipLoader } from 'react-spinners';

interface OwnProps extends InjectedIntlProps {
  message: string;
}

type Props = OwnProps & InjectedIntlProps;

const BusyIndicatorComponent: FC<Props> = (props) => {
  const { message } = props;

  const stackTokens = { childrenGap: 10 };
  const stackStyles: Partial<IStackStyles> = { root: { minHeight: 'calc(80vh)', marginTop: 10 } };

  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      tokens={stackTokens}
      styles={stackStyles}
    >
      <Stack horizontalAlign="center" >
        <ClipLoader
          size={30}
          color={'rgb(0, 120, 212)'}
          loading={true}
        />
        <Text variant="xLargePlus">{message}</Text>
      </Stack>
    </Stack>
  );
};

export const BusyIndicator = injectIntl(BusyIndicatorComponent);