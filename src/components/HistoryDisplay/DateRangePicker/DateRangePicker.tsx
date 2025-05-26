import { Button, Group, Popover, SegmentedControl } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import classes from "./DateRangePicker.module.css";
import { TbChevronDown, TbClockHour9 } from "react-icons/tb";

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
  const [opened, setOpened] = useState<boolean>(false);

  const rangeSegmentControlDict: Record<string, string> = {
    day: "24hr",
    week: "Week",
    month: "Month",
    year: "Year",
    all: "All",
    custom: `${dayjs(range[0]).format("DD/MM/YYYY")} - ${
      range[1] ? dayjs(range[1]).format("DD/MM/YYYY") : "?"
    }`,
  };

  useEffect(() => {
    const now = dayjs();
    switch (props.period) {
      case "day":
        props.setDateRange([now.subtract(24, "hours"), now]);
        break;
      case "week":
        props.setDateRange([now.subtract(1, "week"), now]);
        break;
      case "month":
        props.setDateRange([now.subtract(1, "month"), now]);
        break;
      case "year":
        props.setDateRange([now.subtract(1, "year"), now]);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.period]);

  const handleDateChange = (start: Date | null, end: Date | null) => {
    if (start && end) {
      const startDjs = dayjs(start);
      const endDjs = dayjs(end);

      props.setDateRange([startDjs.startOf("day"), endDjs.endOf("day")]);

      setRange([start, end]);
      setOpened(false);
      props.setPeriod("custom");
    } else {
      setRange([start, null]);
    }
  };

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      shadow="sm"
      classNames={{ dropdown: classes.dropdown }}
      position="bottom-start"
    >
      <Popover.Target>
        <Button
          onClick={() => setOpened((o) => !o)}
          leftSection={<TbClockHour9 size={16} />}
          rightSection={<TbChevronDown size={16} />}
          variant="default"
          c="inherit"
          classNames={{
            root: classes.buttonRoot,
          }}
        >
          {rangeSegmentControlDict[props.period]}
        </Button>
      </Popover.Target>
      <Popover.Dropdown p="xs">
        <Group>
          <DatePicker
            type="range"
            allowSingleDateInRange
            value={range}
            onChange={(e) => handleDateChange(e[0], e[1])}
            maxDate={new Date()}
            classNames={{ day: classes.datePickerDay }}
          />
          <SegmentedControl
            orientation="vertical"
            value={props.period}
            onChange={(e) => {
              props.setPeriod(e);
              setOpened(false);
              setRange([null, null]);
            }}
            data={[
              { label: "24hr", value: "day" },
              { label: "Week", value: "week" },
              { label: "Month", value: "month" },
              { label: "Year", value: "year" },
              { label: "All", value: "all" },
            ]}
            withItemsBorders={false}
            bg="none"
            classNames={{
              indicator:
                props.period === "custom"
                  ? classes.disabledIndicator
                  : classes.segmentIndicator,
            }}
          />
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};
