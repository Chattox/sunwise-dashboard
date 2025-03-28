import { Box, Stack, Title } from "@mantine/core";
import { LatestReadingDisplay } from "../LatestReadingDisplay";
import { HistoryDisplay } from "../HistoryDisplay";
import { ColorSchemeSwitcher } from "../ColorSchemeSwitcher/ColorSchemeSwitcher";

export const Dashboard = () => {
  return (
    <Box p="xs">
      <Stack>
        <Title order={2} mb="md">
          Sunwise Dashboard
        </Title>
        <ColorSchemeSwitcher />
        <Title order={4}>Current conditions</Title>
        <LatestReadingDisplay station="sunwise" />
        <HistoryDisplay station="sunwise" />
      </Stack>
    </Box>
  );
};
