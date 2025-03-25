import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Dashboard } from "./components/Dashboard";
import { theme } from "./theme";

function App() {
  return (
    <MantineProvider theme={theme}>
      <Dashboard />
    </MantineProvider>
  );
}

export default App;
