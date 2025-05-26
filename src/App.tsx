import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Dashboard } from "./components/Dashboard";
import { theme } from "./theme";
import { useMediaQuery } from "@mantine/hooks";

function App() {
  const isMobile = useMediaQuery("(max-width: 75em)") || false;
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Dashboard isMobile={isMobile} />
    </MantineProvider>
  );
}

export default App;
