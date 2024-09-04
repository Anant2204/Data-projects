import React from 'react';
import { FormattedNumber } from 'react-intl';
import { Props } from './formatNumber.types';

const FormatNumber: React.FC<Props> = props => {
  const minimum = props.minimumFractionDigits || 2;
  const maximum = props.maximumFractionDigits || 2;
  const currency = props.showCurrency ? props.currency : '';
  return (
    <React.Fragment>
      <FormattedNumber
        value={props.value}
        currency={props.currency}
        minimumFractionDigits={minimum}
        maximumFractionDigits={maximum}
      />
      &nbsp; {currency}
    </React.Fragment>);
}

export default FormatNumber;