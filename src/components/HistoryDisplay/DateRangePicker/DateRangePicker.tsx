import { Button, Popover } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import React, { useState } from "react";

export const DateRangePicker = (props: {
  dateRange?: dayjs.Dayjs[];
  setDateRange: (dates: dayjs.Dayjs[]) => void;
  period: string;
  setPeriod: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const initialRange: [Date, Date] = props.dateRange
    ? [props.dateRange[0].toDate(), props.dateRange[1].toDate()]
    : [dayjs().subtract(1, "day").toDate(), dayjs().toDate()];
  const [range, setRange] = useState<[Date | null, Date | null]>(initialRange);

  const handleDateChange = (start: Date | null, end: Date | null) => {
    if (start && end) {
      const startDjs = dayjs(start);
      const endDjs = dayjs(end);

      // If dates are the same, set range to that whole 24 hr period
      if (startDjs.isSame(endDjs)) {
        props.setDateRange([startDjs.startOf("day"), endDjs.endOf("day")]);
      } else {
        props.setDateRange([startDjs, endDjs]);
      }
    }
  };

  return (
    <Popover>
      <Popover.Target>
        <Button>Hello</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <DatePicker
          type="range"
          allowSingleDateInRange
          value={range}
          onChange={(e) => handleDateChange(e[0], e[1])}
          maxDate={new Date()}
        />
      </Popover.Dropdown>
    </Popover>
  );
};
