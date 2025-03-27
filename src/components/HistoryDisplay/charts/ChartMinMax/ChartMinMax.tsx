import { Table } from "@mantine/core";
import { dataLabels } from "../../../../utils";
import { round } from "../../../../utils/round";
import classes from "./ChartMinMax.module.css";

export const ChartMinMax = (props: {
  data: IndividualReading[];
  measurement: string;
}) => {
  const dataNumbers = props.data.map(
    (reading: IndividualReading) => reading[props.measurement] as number
  );

  const dataMin = props.data.length > 0 ? Math.min(...dataNumbers) : 0;
  const dataMax = props.data.length > 0 ? Math.max(...dataNumbers) : 0;
  const average =
    props.data.length > 0
      ? round(dataNumbers.reduce((p, c) => p + c) / dataNumbers.length)
      : 0;

  const unit = dataLabels[props.measurement].unit;

  const cumulativeRainTable = (
    <Table
      withRowBorders={false}
      verticalSpacing={1}
      classNames={{ table: classes.table, th: classes.th, td: classes.td }}
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>total</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr key={props.measurement}>
          <Table.Td>{`${dataMax} ${unit}`}</Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );

  const defaultTable = (
    <Table
      withRowBorders={false}
      verticalSpacing={1}
      classNames={{ table: classes.table, th: classes.th, td: classes.td }}
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>min</Table.Th>
          <Table.Th>max</Table.Th>
          <Table.Th>avg</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr key={props.measurement}>
          <Table.Td>{`${dataMin} ${unit}`}</Table.Td>
          <Table.Td>{`${dataMax} ${unit}`}</Table.Td>
          <Table.Td>{`${average} ${unit}`}</Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );

  return props.measurement === "cumulativeRain"
    ? cumulativeRainTable
    : defaultTable;
};
