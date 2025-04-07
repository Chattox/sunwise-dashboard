import { Box, Group, Stack, Title } from "@mantine/core";
import { LatestReadingDisplay } from "../LatestReadingDisplay";
import { HistoryDisplay } from "../HistoryDisplay";
import { ColorSchemeSwitcher } from "../ColorSchemeSwitcher/ColorSchemeSwitcher";

export const Dashboard = (props: { isMobile: boolean }) => {
  return (
    <Box p="xs">
      <Stack>
        <Group w="100%" justify="space-between">
          <Title order={2} mb="md">
            Sunwise Dashboard
          </Title>
          <ColorSchemeSwitcher />
        </Group>
        <Title order={4}>Current conditions</Title>
        <LatestReadingDisplay station="sunwise" isMobile={props.isMobile} />
        <Title order={4}>History</Title>
        <HistoryDisplay station="sunwise" isMobile={props.isMobile} />
      </Stack>
    </Box>
  );
};
