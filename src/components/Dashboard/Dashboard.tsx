import { Box, Title } from "@mantine/core";
import { LatestReadingDisplay } from "../LatestReadingDisplay";

export const Dashboard = () => {
  return (
    <Box>
      <Title order={2} mb="md">
        Sunwise Dashboard
      </Title>
      <Title order={4}>Current conditions</Title>
      <LatestReadingDisplay station="sunwise" />
    </Box>
  );
};
