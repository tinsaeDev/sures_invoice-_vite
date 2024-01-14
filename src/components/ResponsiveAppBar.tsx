import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setLightMoode } from "../features/app/appSlice";

export default function ResponsiveAppbar() {
  const lightMode = useSelector((root: RootState) => root.app.light_mode);
  const dispatch = useDispatch();

  return (
    <AppBar>
      <Toolbar>
        <Stack
          flexGrow={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <Typography fontWeight="bold">Sures Invoice</Typography>
          </Stack>

          <Stack>
            <IconButton
              onClick={() => {
                dispatch(setLightMoode(lightMode == "dark" ? "light" : "dark"));
              }}
            >
              {lightMode == "light" && <DarkMode color="error" />}
              {lightMode == "dark" && <LightMode color="warning" />}
            </IconButton>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
