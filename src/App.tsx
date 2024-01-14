import "./App.css";

import Invoice from "./pages/invoice/nvoice";
import ResponsiveAppbar from "./components/ResponsiveAppBar";

// Theming
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Box } from "@mui/material";

function App() {
  const lightMode = useSelector((root: RootState) => root.app.light_mode);

  const darkTheme = createTheme(
    lightMode == "light"
      ? {
          palette: {
            mode: lightMode,
            background:{
              default:"#ececec"
            }
          },
        }
      : {
          palette: {
            mode: lightMode,
          },
        }
  );

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <ResponsiveAppbar />
        <Box sx={{ mt: 8 }}>
          <Invoice />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
