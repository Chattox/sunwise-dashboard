import { Table } from "@mantine/core";
import classes from "./ChartMinMax.module.css";

export const WindMinMax = (props: { windData: WindDirData[] }) => {
  const compassDict: Record<string, string> = {
    n: "North",
    ne: "Northeast",
    e: "East",
    se: "Southeast",
    s: "South",
    sw: "Southwest",
    w: "West",
    nw: "Northwest",
  };

  let prevailing: WindDirData = { dir: "", amount: 0 };
  props.windData.forEach((i: WindDirData) => {
    if (prevailing.amount < i.amount) {
      prevailing = i;
    }
  });

  return (
    <Table
      withRowBorders={false}
      verticalSpacing={1}
      classNames={{ table: classes.table, th: classes.th, td: classes.td }}
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>prevailing</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr key={"windDirection"}>
          <Table.Td>{compassDict[prevailing.dir.toLowerCase()]}</Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
};
