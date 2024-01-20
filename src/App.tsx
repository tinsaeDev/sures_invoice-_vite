import "./App.css";

import ResponsiveAppbar from "./components/ResponsiveAppBar";

// Theming
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { IntlProvider } from "react-intl";
import AlertProvider from "./pages/invoice/components/Alert";

function App() {
  const lightMode = useSelector((root: RootState) => root.app.light_mode);

  const darkTheme = createTheme(
    lightMode == "light"
      ? {
          palette: {
            mode: lightMode,
            background: {
              default: "#ececec",
            },
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

        <IntlProvider
          // messages={messagesInFrench}
          locale="fr"
          defaultLocale="en"
        >
          <AlertProvider>
            <ResponsiveAppbar />
            <Box sx={{ mt: 8 }}>
              <Outlet />
            </Box>
          </AlertProvider>
        </IntlProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
