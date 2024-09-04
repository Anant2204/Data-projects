import * as React from "react";
import { DatePicker, IDatePickerStrings } from "@fluentui/react";
import { useEffect, useState } from "react";
import { IDateComponentProps } from "./oseDatePicker.types";
import dayjs from 'dayjs';
import moment from "moment";
import { messages } from "./messages";
import { injectIntl } from "react-intl";

const OseDateComponent: React.FC<IDateComponentProps> = ({
  name,
  label,
  date,
  setDate,
  disabled = false,
  endMonth = dayjs().add(10, 'year').toDate(),
  startMonth = dayjs().subtract(3, 'year').toDate(),
  intl
}) => {
  const [initialDate, setInitialDate] = useState<Date | undefined>(
    date || new Date()
  );

  const onDateSelect = (date: Date | null | undefined) => {
    setInitialDate(date);
    setDate(date);
  };
  //this is requred to set the date dynamically for the selected resource from onCellClick of Grid
  //TODO verify while environment code refactor and remove this if not required
  useEffect(() => {
    setInitialDate(date);
  }, [date]);

  const months = [];
  const monthsAbbreviated = [];
  for (let i = 0; i < 12; i++) {
    months.push(moment().month(i).format('MMMM'));
    monthsAbbreviated.push(moment().month(i).format('MMM'));
  }

  const datepicker : IDatePickerStrings = {isRequiredErrorMessage: intl.formatMessage(messages.dateRequiredError), 
    goToToday: intl.formatMessage(messages.goToToday), months: months , shortMonths: monthsAbbreviated, days: [], shortDays: []}

  return (
    <DatePicker
      disabled={disabled}
      id={name}
      label={label}
      value={initialDate}
      allowTextInput={true}
      highlightSelectedMonth={true}
      onSelectDate={onDateSelect}
      isRequired={true}
      formatDate={(date) =>
        date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
      }
      parseDateFromString={(value) => {
        const parts = RegExp(/(\w+) (\d+)/).exec(value);
        if (parts && parts.length === 3) {
          const month = parts[1];
          const year = parts[2];
          return new Date(`${month} 1, ${year}`);
        }
        return undefined;
      }}
      calendarProps={{ isDayPickerVisible: false }}
      maxDate={endMonth}
      minDate={startMonth}
      strings={datepicker}
    />
  );
};

export const OseDatePicker = injectIntl(OseDateComponent);
