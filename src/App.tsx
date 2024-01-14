import "./App.css";

import Invoice from "./pages/invoice/nvoice";
import ResponsiveAppbar from "./components/ResponsiveAppBar";

// Theming
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const lightMode = useSelector((root: RootState) => root.app.light_mode);

  const darkTheme = createTheme({
    palette: {
      mode: lightMode,
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <Invoice />
      </ThemeProvider>

      <ResponsiveAppbar />
    </>
  );
}

export default App;
