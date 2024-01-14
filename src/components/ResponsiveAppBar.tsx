import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography, IconButton, Stack, Container, Chip } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";

// tHEMEE
import { CloudOffOutlined, DarkMode, LightMode } from "@mui/icons-material";
import { RootState } from "../store";
import { setLightMoode } from "../features/app/appSlice";

function ResponsiveAppBar() {
  const dispatch = useDispatch();

  const colorMode = useSelector((state: RootState) => state.app.light_mode);

  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(function () {
    window.addEventListener("offline", function () {
      setIsOnline(false);
    });

    // Online
    window.addEventListener("online", function () {
      setIsOnline(true);
    });
  }, []);

  return (
    <>
      <AppBar color="inherit" position="fixed">
        <Container maxWidth="xl">
          <Toolbar variant="dense" disableGutters>
            <Stack
              sx={{ width: "100%" }}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack alignItems={"center"} direction="row">
                <IconButton className="menu">
                  <MenuIcon fontSize="small" />
                </IconButton>
                <Typography
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { md: "flex" },
                    // fontFamily: 'monospace',
                    fontWeight: 700,
                    // letterSpacing: '.3rem',
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Sures Invoice
                </Typography>
                {!isOnline && (
                  <Chip
                    size="small"
                    color="error"
                    icon={<CloudOffOutlined />}
                    label="Offline"
                  />
                )}
              </Stack>
              <Stack direction={"row"} alignItems={"center"}>
                {/* Download Center */}

                {/* Theme Switch */}
                <IconButton
                  onClick={() => {
                    const darkMode = colorMode == "dark";
                    dispatch(setLightMoode(darkMode ? "light" : "dark"));
                  }}
                >
                  {colorMode == "dark" ? (
                    <LightMode color="warning" fontSize="small" />
                  ) : (
                    <DarkMode fontSize="small" />
                  )}
                </IconButton>
                {/* Profile Info */}
              </Stack>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;
